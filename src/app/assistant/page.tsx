"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import {
  chatSessionsAtom,
  currentChatIdAtom,
  defaultSystemMessage,
  createNewChatSession,
} from "@/src/atoms/chatAtom";
import { useToast } from "@/src/hooks/use-toast";
import { MainSidebar } from "@/src/components/main-sidebar";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { OpenAIService } from "@/src/services/OpenAIService";
import Loading_Animation from "@/src/components/loading/dark_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), { ssr: false });

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function AssistantPage() {
  const [chatSessions, setChatSessions] = useAtom(chatSessionsAtom);
  const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom);
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentChat = chatSessions.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const updateMessages = (newMessages: ChatMessage[]) => {
    if (!currentChatId) return;
    setChatSessions((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId ? { ...chat, messages: newMessages } : chat
      )
    );
  };

  const deleteCurrentChat = () => {
    if (!currentChatId) return;
    const remaining = chatSessions.filter((chat) => chat.id !== currentChatId);
    setChatSessions(remaining);
    if (remaining.length > 0) {
      setCurrentChatId(remaining[0].id);
    } else {
      const newChat = createNewChatSession();
      setChatSessions([newChat]);
      setCurrentChatId(newChat.id);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !currentChatId) return;

    const hasSystem = messages[0]?.role === "system";
    const base = hasSystem ? messages : [defaultSystemMessage, ...messages];
    const newMessages: ChatMessage[] = [...base, { role: "user", content: input }];

    updateMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await OpenAIService.sendMessage({ messages: newMessages });
      const reply: ChatMessage = {
        role: "assistant",
        content: res.choices[0].message.content,
      };
      updateMessages([...newMessages, reply]);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to connect to assistant",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">AI Assistant 🧠</h1>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <select
                  value={currentChatId ?? ""}
                  onChange={(e) => setCurrentChatId(e.target.value)}
                  className="appearance-none w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {chatSessions.map((chat) => (
                    <option key={chat.id} value={chat.id}>
                      {chat.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  ▼
                </div>
              </div>

              <Button
                onClick={() => {
                  const newChat = createNewChatSession();
                  setChatSessions([...chatSessions, newChat]);
                  setCurrentChatId(newChat.id);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
              >
                New Chat
              </Button>
              <Button
                onClick={deleteCurrentChat}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2"
              >
                Clear Chat
              </Button>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6 h-[500px] overflow-y-auto mb-6 space-y-4 shadow-sm">
            {messages.filter((msg) => msg.role !== "system").length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <div className="text-4xl mb-4">💬</div>
                <h2 className="text-lg font-medium">Start a new conversation</h2>
                <p className="text-sm mt-1">Ask about materials, costs, or supplier advice</p>
              </div>
            ) : (
              messages
                .filter((msg) => msg.role !== "system")
                .map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 max-w-[80%] rounded-xl text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-gray-100 text-gray-900 shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))
            )}

            {isLoading && (
              <div className="w-full flex justify-center py-6">
                <div className="w-20 h-20">
                  <DynamicLottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: Loading_Animation,
                      rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
                    }}
                    isClickToPauseDisabled={true}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me something..."
              className="flex-1 bg-white rounded-lg px-4 py-3 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 shadow-sm"
            />
            <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}