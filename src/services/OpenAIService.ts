// src/lib/openai.service.ts

export class OpenAIService {
    static async sendMessage({ messages }: { messages: ChatMessage[] }) {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong with the assistant.');
    }

    return data;
  }
}
