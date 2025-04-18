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
import { findOptimalPackCombination, Pack } from "@/src/lib/packOptimizer";
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const headerData = useAtomValue(headerAtom);
  const themeData = useAtomValue(designThemeAtom);
  const questionData = useAtomValue(questionAtom);
  const setProjectData = useSetAtom(projectAtom);
  const [priceList, setPriceList] = useState<number[]>([]);
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
    if (showReview) {
      getDesignThemePrices();
    }
  }, [showReview]);

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

  const getDesignThemePrices = async () => {
    const projectId = projectData.selectedItem.id;

    const promises = themeData.list.map(async (theme: { id: string }) => {
      // Step 1: Get all products attached to the current project
      const { data: projectProducts, error: ppError } = await supabase
        .from("project_products")
        .select("product_id, quantity")
        .eq("project_id", projectId);

      if (ppError) throw ppError;

      const productIds = projectProducts.map((p) => p.product_id);

      // Step 2: Get products with matching IDs and the specific theme
      const { data: matchingProducts, error: prodError } = await supabase
        .from("products")
        .select("id, price, themes")
        .in("id", productIds);

      if (prodError) throw prodError;

      let totalPrice = 0;

      for (const product of matchingProducts) {
        const productThemes = product.themes || [];

        const matchesTheme =
          Array.isArray(productThemes) && productThemes.includes(theme.id);

        if (matchesTheme) {
          const quantityObj = projectProducts.find(
            (p) => p.product_id === product.id
          );
          const quantity = quantityObj?.quantity || 0;
          totalPrice += (product.price || 0) * quantity;
        }
      }

      return totalPrice;
    });

    try {
      const priceList = await Promise.all(promises);
      setPriceList(priceList);
    } catch (error) {
      console.error("Error fetching design theme prices:", error);
    }
  };

  const handleSaveAndNext = async () => {
    if (hasUnsavedChanges) {
      await handleSaveAnswers();
      setHasUnsavedChanges(false);
    }
    handleGotoNextCategory();
  };

  const handleSaveAndPrevious = async () => {
    if (hasUnsavedChanges) {
      await handleSaveAnswers();
      setHasUnsavedChanges(false);
    }
    handleGotoPreviousCategory();
  };

  const handleSaveAndNextStep = async () => {
      if (hasUnsavedChanges) {
        await handleSaveAnswers();
        setHasUnsavedChanges(false);
      }
      handleGotoNextStep();
    };

  const updateAnswer = (questionId: string, answer: string) => {
    setAnswerList((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (item) => item.questionId === questionId
      );

      let updatedAnswers;

      if (existingIndex !== -1) {
        updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex] = { questionId, answer };
      } else {
        updatedAnswers = [...prevAnswers, { questionId, answer }];
      }

      setHasUnsavedChanges(true);
      return updatedAnswers;
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

      // 1. Get answered question IDs
      const questionIdList = answerList.map((item) => item.questionId);
      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("id, answer, type")
        .in("id", questionIdList);

      if (questionsError) throw questionsError;
      if (!questionsData || questionsData.length === 0) return [];

      // 2. Get current project theme
      const projectId = projectData.selectedItem.id;
      const currentProjectThemeId = projectData.selectedItem.design_theme || null;

      // 3. Collect all product IDs from answers
      const productQuantities: { [productId: string]: number } = {};
      const referencedProductIds = new Set<string>();

      for (const answerItem of answerList) {
        const question = questionsData.find((q) => q.id === answerItem.questionId);
        if (!question) continue;

        try {
          if (question.type === "number") {
            const quantity = parseInt(answerItem.answer, 10);
            const questionId = question.id;

            const isWiredSmoke = questionId === "67807c5d-0a41-4161-8d30-8f8f1ff28059";
            const isBatterySmoke = questionId === "7b55934a-d833-4f07-97d4-da14d32663a2";

            if ((isWiredSmoke || isBatterySmoke) && quantity > 0) {
              const { data: smokeProducts, error: smokeError } = await supabase
                .from("products")
                .select("id, unit_per_pack, price, themes")
                .ilike("name", isWiredSmoke ? "%Wired%" : "%Battery%");

              if (smokeError) {
                console.error("🔥 Smoke fetch error:", smokeError);
                continue;
              }

              const packs = (smokeProducts || [])
                .filter((p: any) => typeof p.unit_per_pack === "number")
                .map((p: any) => ({
                  size: p.unit_per_pack,
                  price: p.price || 0,
                  product: p,
                }));

              const optimized = findOptimalPackCombination(packs, quantity);
              console.log("📦 Optimized pack breakdown:", optimized.breakdown);

              optimized.breakdown.forEach(({ size, count }) => {
                const match = packs.find((p) => p.size === size)?.product;
                if (match) {
                  const productId = match.id;
                  const themeList = match.themes || [];

                  const isThemeCompatible =
                    !currentProjectThemeId ||
                    themeList.length === 0 ||
                    themeList.includes(currentProjectThemeId);

                  if (productId && isThemeCompatible) {
                    productQuantities[productId] = (productQuantities[productId] || 0) + count;
                    referencedProductIds.add(productId);
                    console.log(`🧾 Added ${count} of ${size}-pack: ${productId}`);
                  }
                }
              });
            } else {
              // Non-smoke numeric fallback
              const productObjs = question.answer?.[0]?.products || [];

              productObjs.forEach((p: any) => {
                const productId = p.productId || p.id;
                const themePath = p.themePath || null;

                const isThemeCompatible =
                  !currentProjectThemeId || !themePath || themePath === currentProjectThemeId;

                if (productId && isThemeCompatible) {
                  productQuantities[productId] = (productQuantities[productId] || 0) + quantity;
                  referencedProductIds.add(productId);
                }
              });
            }

          } else if (question.type === "options") {
            const options = question.answer || [];
            const selectedOption = options.find(
              (option: any) => option.id === answerItem.answer
            );
            const products = selectedOption?.products || [];

            products.forEach((p: any) => {
              const productId = p.productId || p.id;
              const themePath = p.themePath || null;

              const isThemeCompatible =
                !currentProjectThemeId || !themePath || themePath === currentProjectThemeId;

              if (productId && isThemeCompatible) {
                productQuantities[productId] = (productQuantities[productId] || 0) + 1;
                referencedProductIds.add(productId);
              }
            });
          }
        } catch (error) {
          console.error("Error processing answer:", error);
        }
      }

      // 4. Fetch existing project products
      const { data: existingProducts, error: fetchError } = await supabase
        .from("project_products")
        .select("product_id, quantity")
        .eq("project_id", projectId);

      if (fetchError) throw fetchError;

      const existingProductIds = (existingProducts || []).map((p) => p.product_id);

      // 5. Fetch full product info for existing ones
      const { data: fullExistingProducts, error: productThemeError } = await supabase
        .from("products")
        .select("id, themes")
        .in("id", existingProductIds);

      if (productThemeError) throw productThemeError;

      // 6. Filter products to remove (wrong theme)
      const productsToRemove = fullExistingProducts.filter((prod: any) => {
        const productThemes = prod.themes || [];
        if (!Array.isArray(productThemes) || productThemes.length === 0) return false; // keep unthemed
        return !productThemes.includes(currentProjectThemeId); // remove if theme mismatch
      });


      // 7. Delete incompatible products
      if (productsToRemove.length > 0) {
        const { error: deleteError } = await supabase
          .from("project_products")
          .delete()
          .in(
            "product_id",
            productsToRemove.map((p: any) => p.id)
          )
          .eq("project_id", projectId);

        if (deleteError) throw deleteError;
      }

      // 8. Build insert/update lists
      const existingMap = new Map(
        (existingProducts || []).map((p) => [p.product_id, p.quantity])
      );

      const inserts = [];
      const updates = [];

      for (const [productId, quantity] of Object.entries(productQuantities)) {
        if (quantity > 0) {
          if (existingMap.has(productId)) {
            updates.push({ product_id: productId, quantity, project_id: projectId });
          } else {
            inserts.push({
              product_id: productId,
              quantity,
              phase: "1",
              project_id: projectId,
              status: STATUS_INCOMPLETE_VALUE,
            });
          }
        } else {
          // Remove product if quantity is 0 or invalid
          const { error: deleteZeroError } = await supabase
            .from("project_products")
            .delete()
            .eq("product_id", productId)
            .eq("project_id", projectId);

          if (deleteZeroError) console.error("Failed to remove zero-qty product:", deleteZeroError);
        }
      }

  const toDelete = existingProductIds.filter((id) => !referencedProductIds.has(id));

  if (toDelete.length > 0) {
    const { error: cleanupError } = await supabase
      .from("project_products")
      .delete()
      .in("product_id", toDelete)
      .eq("project_id", projectId);

    if (cleanupError) console.error("Error removing deselected products:", cleanupError);
  }


      // 9. Insert new products
      if (inserts.length > 0) {
        const { error: insertError } = await supabase
          .from("project_products")
          .insert(inserts);
        if (insertError) throw insertError;
      }

      // 10. Update existing products
      for (const updateItem of updates) {
        const { error: updateError } = await supabase
          .from("project_products")
          .update({ quantity: updateItem.quantity })
          .eq("product_id", updateItem.product_id)
          .eq("project_id", updateItem.project_id);
        if (updateError) throw updateError;
      }

      // 11. Save answers to project
      const answers = answerList.filter((answer: any) => answer.answer !== "");
      const { error: updateProjectError } = await supabase
        .from("projects")
        .update({ answers })
        .eq("id", projectId);

      if (updateProjectError) throw updateProjectError;

      // 12. Update local state
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
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
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
        {showReview ? (
            <Button
              onClick={() => goToCategory(0)}
              className="bg-[#2365C8] text-white hover:bg-blue-700"
            >
              Go to Full Category Form
            </Button>
          ) : (
            <div className="flex gap-2 items-center">
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
                onClick={handleGotoReview}
                className="bg-[#2365C8] text-white hover:bg-blue-700"
              >
                Jump to Review
              </Button>
            </div>
          )}
        </div>

      {!showReview && (
        <div className="space-y-4 flex flex-col min-h-[70vh] justify-between">
          <div>
            <h2 className="text-lg font-medium">{currentHeader.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentQuestions.map((question: any, index: number) => {
                const answer = answerList.find((a: any) => a.questionId === question.id)?.answer || "";
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <p className="w-1/2 text-sm">{question.question}</p>
                    {question.type === "options" ? (
                      <Select value={answer} onValueChange={(val) => updateAnswer(question.id, val)}>
                        <SelectTrigger className="max-w-[200px] bg-white text-black border border-gray-300 shadow-sm">
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
          </div>

          <div className="flex justify-between pt-6">
            <div className="flex gap-2">
              <Button
                disabled={currentCategoryIndex === 0}
                onClick={handleSaveAndPrevious}
                className="bg-gray-300 hover:bg-gray-400"
              >
                Previous Category
              </Button>
              <Button
                onClick={handleSaveAndNext}
                className="bg-[#2365C8] text-white hover:bg-blue-700"
              >
                {currentCategoryIndex === headerData.list.length - 1 ? "Finish" : "Next Category"}
              </Button>
            </div>

            <div className="flex gap-2 items-center">
              <Button
                onClick={handleSaveAnswers}
                className="text-sm bg-[#2365C8] text-white hover:bg-blue-700"
              >
                {isLoading ? (
                  <div className="w-6 h-6">
                    <DynamicLottie
                      options={{ loop: true, autoplay: true, animationData: Loading_Animation }}
                      isClickToPauseDisabled={true}
                    />
                  </div>
                ) : (
                  <span>Save Changes</span>
                )}
              </Button>
            </div>
          </div>
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

          {themeData.list.length > 0 && (
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Design Theme Costs</h3>
              {priceList.length === 0 ? (
                <p className="text-sm text-muted-foreground">Loading product data...</p>
              ) : (
                priceList.map((total, idx) => (
                  <div key={themeData.list[idx].id} className="text-sm text-gray-700">
                    {themeData.list[idx].name}: ${total.toFixed(2)}
                  </div>
                ))
              )}
            </div>
          )}

          <div className="flex justify-end pt-6 gap-2">
            <Button
              onClick={handleGotoPrevStep}
              className="bg-[#2365C8] text-white hover:bg-blue-700"
            >
              Previous Step
            </Button>
            <Button
              onClick={handleSaveAndNextStep}
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