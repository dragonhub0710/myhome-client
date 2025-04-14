/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase } from "@/src/lib/supabase";

const slugify = (str: string) =>
str.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "_");

export interface FormQuestion {
  id: string;
  key: string;
  label: string;
  category: string;
  type?: string;
  answer?: { products?: any[] }[];
}

export async function fetchQuestionsWithHeaders(): Promise<FormQuestion[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("id, question, header(name), answer, type")
    .order("header", { ascending: true });

  if (error) {
    console.error("Error fetching questions:", error.message);
    return [];
  }

  const questions = (data || [])
    .map((item: any) => {
      const label =
        typeof item.question === "string" ? item.question.trim() : "";
      const key = slugify(label);
      const category =
        Array.isArray(item.header) && item.header.length > 0
          ? item.header[0].name?.trim()
          : item.header?.name?.trim();

      if (!key || !category || !item.id) return null;

      return {
        id: item.id,
        key,
        label,
        category,
        answer: item.answer || [],
        type: item.type || "text",
      };
    })
    .filter(Boolean) as FormQuestion[];

  // Step 1: Collect all productIds
  const allProductIds = new Set<string>();
  for (const q of questions) {
    q.answer?.forEach((opt) => {
      opt.products?.forEach((p: any) => {
        if (p.productId) allProductIds.add(p.productId);
      });
    });
  }

  // Step 2: Fetch products
  const { data: productData, error: productError } = await supabase
    .from("products")
    .select("id, name, themes")
    .in("id", [...allProductIds]);

  if (productError) {
    console.error("Error fetching products:", productError.message);
    return questions;
  }

  // Step 3: Collect all theme IDs
  const allThemeIds = new Set<string>();
  productData?.forEach((product) => {
    (product.themes || []).forEach((theme: any) => {
      const id = typeof theme === "string" ? theme : theme?.id;
      if (id) allThemeIds.add(id);
    });
  });

  // Step 4: Fetch design theme names
  const { data: themeData, error: themeError } = await supabase
    .from("themes") // change if your table is named differently
    .select("id, name")
    .in("id", [...allThemeIds]);

  if (themeError) {
    console.error("Error fetching themes:", themeError.message);
    return questions;
  }

  const themeMap = new Map((themeData || []).map((t: any) => [t.id, t.name]));

  // Step 5: Replace theme IDs with theme names
  for (const product of productData || []) {
    if (Array.isArray(product.themes)) {
      product.themes = product.themes.map((theme: any) => {
        const id = typeof theme === "string" ? theme : theme?.id;
        return themeMap.get(id) || id;
      });
    }
  }

  // Step 6: Map productId → full product
  const productMap = new Map(
    (productData || []).map((p: any) => [p.id, p])
  );

  // Step 7: Replace productId in questions with full product object
  for (const q of questions) {
    q.answer?.forEach((opt) => {
      if (opt.products) {
        opt.products = opt.products.map((p: any) =>
          productMap.get(p.productId) || p
        );
      }
    });
  }

  return questions;
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
