/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";
import { supabase } from "@/src/lib/supabase";
import { projectAtom } from "@/src/atoms/projectAtom";
import { headerAtom } from "@/src/atoms/headerAtom";
import { questionAtom } from "@/src/atoms/questionAtom";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
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
  const questionData = useAtomValue(questionAtom);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    if (projectData && projectData.selectedItem) {
      setAnswerList(projectData.selectedItem.answers || []);
    }
  }, [projectData]);

  useEffect(() => {
    if (headerData.list && headerData.list.length > 0) {
      const initialExpandedSections = new Array(headerData.list.length).fill(
        false
      );
      setExpandedSections(initialExpandedSections);
    }
  }, [headerData]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const updated = { ...prev };
      updated[index] = !prev[index];
      return updated;
    });
  };

  const handleGotoNextStep = () => {
    setCurrentStep(currentStep + 1);
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
            const newQuantity = existingProduct[0].quantity + item.quantity;
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

  return (
    <div
      ref={containerRef}
      className="w-full relative px-10 pr-5 py-6 space-y-4 overflow-y-auto"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Input Form</h1>
          <p className="text-sm text-muted-foreground">STEP 1/3</p>
        </div>
        <Button
          onClick={handleSaveAnswers}
          className="w-36 bg-[#2365C8] text-white hover:bg-blue-700"
        >
          {isLoading ? (
            <div className="w-12 h-12">
              <DynamicLottie
                options={LoadingOptions}
                isClickToPauseDisabled={true}
              />
            </div>
          ) : (
            <p>Save Changes</p>
          )}
        </Button>
      </div>

      <div className="w-full relative space-y-2">
        {headerData.list &&
          headerData.list.length > 0 &&
          headerData.list.map((item: any, idx: number) => {
            const questions = questionData.list.filter(
              (question: any) => question.header === item.id
            );
            return (
              <div key={idx} className="w-full space-y-[2px]">
                <button
                  className="w-full flex bg-[#F5F8FB] border rounded-lg justify-between items-center p-4"
                  onClick={() => toggleSection(idx)}
                >
                  <div className="flex items-center">
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {expandedSections[idx] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSections[idx] &&
                  questions &&
                  questions.length > 0 &&
                  questions.map((question: any, index: number) => {
                    const answer =
                      answerList.find(
                        (answer) => answer.questionId === question.id
                      )?.answer || "";
                    return (
                      <div
                        key={index}
                        className="w-full h-12 py-1 flex items-center rounded-lg bg-white border"
                      >
                        <p className="w-fit px-5 text-sm text-[#4D4D4D]">
                          {question.question}
                        </p>
                        <div className="w-full flex justify-end flex-1">
                          {question.type === "options" && (
                            <Select
                              value={answer}
                              onValueChange={(value: string) => {
                                updateAnswer(question.id, value);
                              }}
                            >
                              <SelectTrigger className="max-w-[400px] bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Select an answer" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                {question.answer &&
                                  question.answer.length > 0 &&
                                  question.answer.map(
                                    (answer: any, idx: number) => {
                                      return (
                                        <SelectItem
                                          key={idx}
                                          value={answer.id}
                                          className="hover:bg-gray-300"
                                        >
                                          {answer.text}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                              </SelectContent>
                            </Select>
                          )}
                          {question.type === "number" && (
                            <Input
                              type="number"
                              value={answer}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const value = e.target.value;
                                if (!isNaN(Number(value)) || value === "") {
                                  updateAnswer(question.id, value);
                                }
                              }}
                              placeholder="Type here ..."
                              className="max-w-[400px] border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <div className="flex gap-4 pt-4">
        <Button disabled className="bg-[#2365C8] text-white hover:bg-blue-700">
          Previous Step
        </Button>
        <Button
          onClick={handleGotoNextStep}
          className="bg-[#2365C8] text-white hover:bg-blue-700"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}
