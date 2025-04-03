"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Mic, Send, Bot } from "lucide-react";
import { OpenAIService } from "@/src/services/OpenAIService";
import { QuestionListOverlay } from "@/src/components/QuestionListOverlay";
import {
  fetchQuestionsWithHeaders,
  fetchAllowedKeys,
  fetchAssistantKeyMap,
} from "@/src/lib/fetchQuestionsWithHeaders";
import { orderedCategories } from "@/src/constants/questionCategories";

interface AssistantPopupProps {
  onSuggestion: (fields: { [questionId: string]: string }) => void;
}

export function AssistantPopup({ onSuggestion }: AssistantPopupProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filledKeys, setFilledKeys] = useState<string[]>([]);
  const [groupedQuestions, setGroupedQuestions] = useState<
    { category: string; questions: { key: string; label: string }[] }[]
  >([]);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    async function load() {
      const questions = await fetchQuestionsWithHeaders();

      const grouped: Record<string, { key: string; label: string }[]> = {};
      questions.forEach(({ key, label, category }) => {
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push({ key, label });
      });

      const sorted = orderedCategories.map((category) => ({
        category,
        questions: grouped[category] || [],
      }));

      setGroupedQuestions(sorted);
    }

    load();
  }, []);

  const handleVoiceInput = () => {
    if (!(window as any).webkitSpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      if (isListening) recognition.start();
    };
    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
      setIsListening(false);
    };
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(" ");
      setInput(transcript);
    };

    if (!isListening) {
      recognition.start();
      recognitionRef.current = recognition;
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);

    try {
      const allowedKeys = await fetchAllowedKeys();
      const { keyToId, idToKey } = await fetchAssistantKeyMap();

      console.log("✅ Allowed Assistant Keys:", allowedKeys);

      const systemMessage = {
        role: "system",
        content: `You're a helpful assistant that receives a user's natural language description of what needs to be filled in a form.
Only respond with a JSON object using **only the keys** mentioned or implied in the input. Do NOT include any keys not in this list. Ignore anything that looks like an ID or UUID. Never respond with anything like "bf2e..." or "0e1b...". ONLY use the exact keys above.
Do NOT include empty or unused fields. Do not pluralize. Use only these keys:

${allowedKeys.map((k) => `"${k}"`).join(", ")}

Output a valid JSON object only.`,
      };

      const res = await OpenAIService.sendMessage({
        messages: [systemMessage, { role: "user", content: input }],
        temperature: 0.4,
      });

      const reply = res.choices[0].message.content;
      console.log("🧠 GPT Reply:", reply);

      const jsonStart = reply.indexOf("{");
      const jsonEnd = reply.lastIndexOf("}") + 1;
      const jsonStr = reply.slice(jsonStart, jsonEnd);

      console.log("🧠 Extracted JSON:", jsonStr);

      const assistantOutput = JSON.parse(jsonStr);
      const filtered = Object.fromEntries(
        Object.entries(assistantOutput).filter(([_, value]) => value !== "")
      );

     const result: Record<string, string> = {};

     for (const [key, value] of Object.entries(filtered)) {
       const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-/.test(key);

       if (isUUID) {
         // If GPT returned UUID, check if it’s a valid question ID
         const assistantKey = idToKey[key];
         if (assistantKey) {
           result[key] = value;
           console.warn(`⚠️ GPT returned UUID (valid question ID): ${key} → assistantKey: ${assistantKey}`);
         } else {
           console.warn(`❌ Unknown UUID returned by GPT (not found in idToKey): ${key}`);
         }
       } else {
         // If GPT returned an assistant key
         const questionId = keyToId[key];
         if (questionId) {
           result[questionId] = value;
         } else {
           console.warn(`❌ Assistant key not found in keyToId map: ${key}`);
         }
       }
     }


     const newFilled = Object.keys(filtered)
       .map((key) => keyToId[key] || key) // map assistantKey → ID, fallback to key if already a UUID
       .filter(Boolean);

     setFilledKeys((prev) => [...new Set([...prev, ...newFilled])]);
      onSuggestion(result);
      setOpen(false);
    } catch (err) {
      console.error("Assistant error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2 flex items-center gap-2 text-sm">
          <Bot size={16} /> Fill with Assistant
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl h-[600px]">
        <DialogTitle className="sr-only">Assistant Form Dialog</DialogTitle>

        <div className="flex h-full w-full gap-6">
          {/* Assistant UI */}
          <div className="flex flex-col flex-1 space-y-4 overflow-auto pr-4">
            <h2 className="text-lg font-medium">Voice Assistant</h2>

            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Say or describe what you want filled in..."
              />
              <Button onClick={handleVoiceInput} variant="ghost" className="p-2">
                <Mic className={isListening ? "text-red-500 animate-pulse" : "text-gray-600"} />
              </Button>
              <Button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white">
                <Send size={16} />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Example: “6 office lights, 2 in the guest room, chandelier in master bedroom.”
            </p>
          </div>

          {/* Questions Panel */}
          <div className="w-[350px] h-full border-l pl-4 flex flex-col">
            <h3 className="text-md font-semibold mb-2">Questions</h3>
            <div className="flex-1 overflow-y-auto max-h-[500px] pr-2">
              <QuestionListOverlay
                groupedQuestions={groupedQuestions}
                filledKeys={filledKeys}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
