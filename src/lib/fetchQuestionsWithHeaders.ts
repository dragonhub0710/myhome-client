// src/lib/fetchQuestionsWithHeaders.ts

import { supabase } from "@/src/lib/supabase";

const slugify = (str: string) =>
str
.toLowerCase()
.replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "_");

export interface FormQuestion {
  id: string;
  key: string;
  label: string;
  category: string;
}

export async function fetchQuestionsWithHeaders(): Promise<FormQuestion[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id, question, header(name)")
    .order("header(name)", { ascending: true });

  if (error) {
    console.error("Error fetching questions:", error.message);
    return [];
  }

  return (data || [])
    .map((item) => {
      const label = typeof item.question === "string" ? item.question.trim() : "";
      const key = slugify(label);
      const category = item.header?.name?.trim();

      if (!key || !category || !item.id) return null;

      return {
        id: item.id,
        key,
        label,
        category,
      };
    })
    .filter(Boolean) as FormQuestion[];
}

export async function fetchAllowedKeys(): Promise<string[]> {
  const questions = await fetchQuestionsWithHeaders();
  const keys = questions.map((q) => q.key);
  console.log("✅ [fetchAllowedKeys] Assistant Keys:", keys);
  return keys;
}

export async function fetchAssistantKeyMap(): Promise<{
  keyToId: Record<string, string>;
  idToKey: Record<string, string>;
}> {
  const questions = await fetchQuestionsWithHeaders();
  return {
    keyToId: Object.fromEntries(questions.map((q) => [q.key, q.id])),
    idToKey: Object.fromEntries(questions.map((q) => [q.id, q.key])),
  };
}