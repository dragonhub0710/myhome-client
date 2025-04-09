/* eslint-disable @typescript-eslint/no-unused-vars */
 /* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { ScrollArea } from "@/src/components/ui/scroll-area";

interface QuestionListOverlayProps {
  groupedQuestions: { category: string; questions: { key: string; label: string }[] }[];
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
          <div className="space-y-1 pl-2">
            {questions.map(({ key, label }) => (
              <div
                key={key}
                className={`text-sm px-2 py-1 rounded ${
                  filledKeys.includes(key)
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
