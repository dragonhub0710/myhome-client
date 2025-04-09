/* eslint-disable @typescript-eslint/no-unused-vars */
 /* eslint-disable @typescript-eslint/no-explicit-any */
 interface InputFormProps {
   currentStep: number;
   setCurrentStep: (step: number) => void;
 }

import { AssistantPopup } from "@/src/components/assistant/AssistantPopup";
import { useEffect, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import dynamic from "next/dynamic";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";
import { supabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";
import { projectAtom } from "@/src/atoms/projectAtom";
import { headerAtom } from "@/src/atoms/headerAtom";
import { designThemeAtom } from "@/src/atoms/themeAtom";
import { questionAtom } from "@/src/atoms/questionAtom";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { fetchAssistantKeyMap } from "@/src/lib/fetchQuestionsWithHeaders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { STATUS_INCOMPLETE_VALUE } from "@/src/constants/constants";
const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

type MaterialInputProps = {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
};

type AnswerProps = {
  questionId: string;
  answer: string;
};

export function InputForm({ currentStep, setCurrentStep }: MaterialInputProps) {
  const { toast } = useToast();
  const projectData = useAtomValue(projectAtom);
  const headerData = useAtomValue(headerAtom);
  const themeData = useAtomValue(designThemeAtom);
  const questionData = useAtomValue(questionAtom);
  const setProjectData = useSetAtom(projectAtom);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [answerList, setAnswerList] = useState<AnswerProps[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<boolean[]>([]);
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [keyToIdMap, setKeyToIdMap] = useState<Record<string, string>>({});


  useEffect(() => {
    async function loadMap() {
      const { keyToId } = await fetchAssistantKeyMap();
      setKeyToIdMap(keyToId);
    }
    loadMap();
  }, []);


  useEffect(() => {
    if (projectData?.selectedItem) {
      setAnswerList(projectData.selectedItem.answers || []);
    }
  }, [projectData]);

  useEffect(() => {
    if (headerData.list && headerData.list.length > 0) {
      setExpandedSections(new Array(headerData.list.length).fill(false));
    }
  }, [headerData]);

  const updateAnswer = (questionId: string, answer: string) => {
      setAnswerList((prevAnswers) => {
        const existingIndex = prevAnswers.findIndex(
          (item) => item.questionId === questionId
        );

        if (existingIndex !== -1) {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingIndex] = { questionId, answer };
          return updatedAnswers;
        } else {
          return [...prevAnswers, { questionId, answer }];
        }
      });
    };

  const handleGotoPrevStep = () => {
      setCurrentStep(currentStep - 1);
    };

  const handleGotoNextStep = () => {
      setCurrentStep(currentStep + 1);
    };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const updated = [...prev];
      updated[index] = !prev[index];
      return updated;
    });
  };

  const goToCategory = (index: number) => {
    setCurrentCategoryIndex(index);
    setShowReview(false);
  };

  const handleGotoNextCategory = () => {
    if (currentCategoryIndex < headerData.list.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    } else {
      setShowReview(true);
    }
  };

  const handleGotoPreviousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    }
  };

  const handleGotoReview = () => {
    setShowReview(true);
  };

  const handleSaveAnswers = async () => {
    try {
      setIsLoading(true);
      const questionIdList = answerList.map((item) => item.questionId);
      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("id, answer, type")
        .in("id", questionIdList);

      if (questionsError) throw questionsError;

      if (!questionsData || questionsData.length === 0) {
        return []; // Return empty array if no questions found
      }

      const productQuantities: { [productId: string]: number } = {};
      answerList.forEach((answerItem) => {
        const question = questionsData.find(
          (q) => q.id === answerItem.questionId
        );

        if (question) {
          if (question.type === "number") {
            try {
              const answerArray = question.answer;
              if (Array.isArray(answerArray) && answerArray.length === 1) {
                const quantity = parseInt(answerItem.answer, 10);
                answerArray[0].products.forEach((productId: string) => {
                  if (!productQuantities[productId]) {
                    productQuantities[productId] = quantity;
                  } else {
                    productQuantities[productId] += quantity;
                  }
                });
              } else {
                console.error(
                  "Invalid 'number' question answer format:",
                  question.answer
                );
              }
            } catch (error) {
              console.error("Error parsing 'number' question answer:", error);
            }
          } else if (question.type === "options") {
            try {
              const options = question.answer;

              if (Array.isArray(options)) {
                const selectedOption = options.find(
                  (option) => option.id === answerItem.answer
                );

                if (selectedOption && Array.isArray(selectedOption.products)) {
                  selectedOption.products.forEach((productId: string) => {
                    if (!productQuantities[productId]) {
                      productQuantities[productId] =
                        (productQuantities[productId] || 0) + 1;
                    } else {
                      productQuantities[productId] += 1;
                    }
                  });
                }
              } else {
                console.error(
                  "The answer column is not in the expected format."
                );
              }
            } catch (error) {
              console.error("Error parsing question answer:", error);
            }
          }
        }
      });

      const productList = Object.entries(productQuantities).map(
        ([productId, quantity]) => ({
          product_id: productId,
          quantity,
          phase: "1",
          project_id: projectData.selectedItem.id,
          status: STATUS_INCOMPLETE_VALUE,
        })
      );
      if (productList && productList.length > 0) {
        productList.forEach(async (item) => {
          // Check if the product already exists
          const { data: existingProduct, error: fetchError } = await supabase
            .from("project_products")
            .select("quantity")
            .eq("product_id", item.product_id)
            .eq("project_id", item.project_id);

          if (fetchError) throw fetchError;

          if (existingProduct) {
            // If the product exists, update its quantity
            const newQuantity = item.quantity;
            const { error: updateError } = await supabase
              .from("project_products")
              .update({ quantity: newQuantity })
              .eq("product_id", item.product_id)
              .eq("project_id", item.project_id);

            if (updateError) throw updateError;
          } else {
            // If the product does not exist, insert it
            const { error: insertError } = await supabase
              .from("project_products")
              .insert(item);

            if (insertError) throw insertError;
          }
        });
      }

      const answers = answerList.filter((answer: any) => answer.answer !== "");
      const { data, error } = await supabase
        .from("projects")
        .update({ answers })
        .eq("id", projectData.selectedItem.id);
      if (error) throw error;
      setProjectData((prev) => {
        if (!prev?.selectedItem) return prev;
        return {
          ...prev,
          selectedItem: {
            ...prev.selectedItem,
            answers,
          },
        };
      });

      toast({ title: "Answers saved successfully!" });
      return;
    } catch (err) {
      console.log(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!headerData?.list || !questionData?.list || headerData.list.length === 0) {
    return <div className="p-6">Loading form...</div>;
  }

  const currentHeader = headerData.list[currentCategoryIndex];
  const currentQuestions = questionData.list.filter(
   (q: any) => q.header === currentHeader.id
   );


  return (
    <div ref={containerRef} className="w-full relative px-10 pr-5 py-6 space-y-4 overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Input Form</h1>
          <p className="text-sm text-muted-foreground">
            {showReview ? "Review" : `Category ${currentCategoryIndex + 1}/${headerData.list.length}`}
          </p>
        </div>
        {!showReview && (
          <Button onClick={handleGotoReview} className="bg-gray-300 hover:bg-gray-400">
            Jump to Review
          </Button>
        )}
      </div>

      {!showReview && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">{currentHeader.name}</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {currentQuestions.map((question: any, index: number) => {
    const answer = answerList.find((a: any) => a.questionId === question.id)?.answer || "";
    return (
      <div key={index} className="flex items-center space-x-4">
        <p className="w-1/2 text-sm">{question.question}</p>
        {question.type === "options" ? (
          <Select value={answer} onValueChange={(val) => updateAnswer(question.id, val)}>
            <SelectTrigger className="max-w-[200px] bg-white text-black border border-gray-300 shadow-sm" >
              <SelectValue placeholder="Select an answer" />
            </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              {question.answer
                ?.filter((opt: any) => {
                  if (!selectedThemeId) return true;
                  if (!opt.themes || opt.themes.length === 0) return true;
                  return opt.themes.includes(selectedThemeId);
                })
                .map((opt: any, idx: number) => (
                  <SelectItem key={idx} value={opt.id}>{opt.text}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type="number"
            value={answer}
            onChange={(e) => updateAnswer(question.id, e.target.value)}
            className="max-w-[200px]"
          />
        )}
      </div>
    );
  })}
</div>


          <div className="flex justify-between pt-4">
            <div className="flex gap-2">
              <Button
                disabled={currentCategoryIndex === 0}
                onClick={handleGotoPreviousCategory}
                className="bg-gray-300 hover:bg-gray-400"
              >
                Previous Category
              </Button>
              <Button
                onClick={handleGotoNextCategory}
                className="bg-[#2365C8] text-white hover:bg-blue-700"
              >
                {currentCategoryIndex === headerData.list.length - 1 ? "Finish" : "Next Category"}
              </Button>
            </div>
            <Button
              onClick={handleSaveAnswers}
              className="text-sm bg-[#2365C8] text-white hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="w-6 h-6">
                  <DynamicLottie options={{ loop: true, autoplay: true, animationData: Loading_Animation }} isClickToPauseDisabled={true} />
                </div>
              ) : (
                <span>Save Changes</span>
              )}
            </Button>

          </div>
      <AssistantPopup
        onSuggestion={(data) => {
          Object.entries(data).forEach(([key, value]) => {
            const questionId = keyToIdMap[key] || key; // fallback to raw key if UUID already
            if (questionId) {
              updateAnswer(questionId, String(value));
              console.log(`✅ Updated ${questionId} with value: ${value}`);
            } else {
              console.warn(`❌ No question ID found for assistant key: ${key}`);
            }
          });
        }}
      />
        </div>
      )}

      {showReview && (
        <div className="space-y-4">
         {headerData.list.map((item: any, idx: number) => {
           const questions = questionData.list.filter((q: any) => q.header === item.id);
            return (
              <div key={idx} className="w-full space-y-[2px]">
                <button
                  className="w-full flex bg-[#F5F8FB] border rounded-lg justify-between items-center p-4"
                  onClick={() => toggleSection(idx)}
                >
                  <div className="flex items-center">
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {expandedSections[idx] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedSections[idx] && (
                  <div className="space-y-2">
                    {questions.map((question: any, index: number) => {
                      const answer = answerList.find((a: any) => a.questionId === question.id)?.answer || "";
                      return (
                        <div key={index} className="w-full h-12 py-1 flex items-center rounded-lg bg-white border">
                          <p className="w-fit px-5 text-sm text-[#4D4D4D]">{question.question}</p>
                          <div className="w-full flex justify-end flex-1">
                            {question.type === "options" ? (
                              <Select value={answer} onValueChange={(value) => updateAnswer(question.id, value)}>
                               <SelectTrigger className="max-w-[400px] bg-white text-black border border-gray-300">
                                  <SelectValue placeholder="Select an answer" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  {question.answer
                                    ?.filter((opt: any) => {
                                      if (!selectedThemeId) return true;
                                      if (!opt.themes || opt.themes.length === 0) return true;
                                      return opt.themes.includes(selectedThemeId);
                                    })
                                    .map((opt: any, idx: number) => (
                                      <SelectItem key={idx} value={opt.id}>{opt.text}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                type="number"
                                value={answer}
                                onChange={(e) => updateAnswer(question.id, e.target.value)}
                                placeholder="Type here ..."
                                className="max-w-[400px] border-none bg-white"
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex justify-end">
                      <Button
                        className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-900"
                        onClick={() => goToCategory(idx)}
                      >
                        Go to Full Category Form
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        <div className="flex justify-end pt-6 gap-2">
            <Button
                        onClick={handleGotoPrevStep}
                        className="bg-[#2365C8] text-white hover:bg-blue-700"
                      >
                        Previous Step
                      </Button>
            <Button
              onClick={handleGotoNextStep}
              className="bg-[#2365C8] text-white hover:bg-blue-700"
               >
              Next Step
              </Button>

          <AssistantPopup
            onSuggestion={(data) => {
              Object.entries(data).forEach(([key, value]) => {
                const questionId = keyToIdMap[key] || key;
                if (questionId) {
                  updateAnswer(questionId, String(value));
                  console.log(`✅ Updated ${questionId} with value: ${value}`);
                } else {
                  console.warn(`❌ No question ID found for assistant key: ${key}`);
                }
              });
            }}
          />

          <Button
            onClick={handleSaveAnswers}
            className="text-sm bg-[#2365C8] text-white hover:bg-blue-700"
          >
            {isLoading ? (
              <div className="w-6 h-6">
                <DynamicLottie
                  options={LoadingOptions}
                  isClickToPauseDisabled={true}
                />
              </div>
            ) : (
              <span>Save Changes</span>
            )}
          </Button>
        </div>

        </div>

      )}
    </div>
  );
}

