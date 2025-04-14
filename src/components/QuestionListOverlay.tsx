/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

interface QuestionListOverlayProps {
  groupedQuestions: {
    category: string;
    questions: {
      key: string;
      label: string;
      type?: string;
      answer?: {
        text?: string;
        products?: any[];
      }[];
    }[];
  }[];
  filledKeys: string[];
}


export function QuestionListOverlay({
  groupedQuestions,
  filledKeys,
}: QuestionListOverlayProps) {

  return (
    <div className="space-y-4">
      {groupedQuestions.map(({ category, questions }) => (
        <div key={category}>
          <h4 className="text-sm font-bold mb-1">{category}</h4>
          <div className="space-y-2 pl-2">
            {questions.map(({ key, label, answer, type }) => (
              <div key={key} className="space-y-1">
                <div
                  className={`text-sm px-2 py-1 rounded ${
                    filledKeys.includes(key)
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {label}
                </div>
                {type === "options" && Array.isArray(answer) && answer.length > 0 && (
                  <div className="ml-4 text-xs text-muted-foreground space-y-2">
                    {answer.map((opt, optIdx) => (
                      <div key={optIdx}>
                        <div className="font-medium">{opt.text || `Option ${optIdx + 1}`}</div>

                        {Array.isArray(opt.products) && opt.products.length > 0 ? (
                          <ul className="list-disc pl-4">
                            {opt.products.map((product: any, prodIdx: number) => (
                              <li key={prodIdx}>
                               {product.name || product.productName || product.productId || product.id}
                               {Array.isArray(product.themes) && product.themes.length > 0 && (
                                 <span className="text-gray-500"> ({product.themes.join(", ")})</span>
                               )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="italic text-gray-400">No products</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
