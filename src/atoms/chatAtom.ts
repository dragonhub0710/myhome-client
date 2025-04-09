/* eslint-disable @typescript-eslint/no-explicit-any */

import { atomWithStorage } from "jotai/utils";
import type { ChatMessage } from "@/src/services/OpenAIService";

// Default system message
export const defaultSystemMessage: ChatMessage = {
role: "system",
content:
"You are a helpful assistant for users trying to refurbish and sell. They may have questions about materials, suppliers, prices, etc. Give as accurate of a response as possible.",
};

// The shape of a full chat session
export type ChatSession = {
id: string;
name: string;
messages: ChatMessage[];
};

// All saved chats
export const chatSessionsAtom = atomWithStorage<ChatSession[]>("chat_sessions", []);

// Currently selected chat session ID
export const currentChatIdAtom = atomWithStorage<string | null>("current_chat_id", null);

export const createNewChatSession = (): ChatSession => ({
id: crypto.randomUUID(),
  name: `Chat ${new Date().toLocaleString()}`,
  messages: [defaultSystemMessage],
});
