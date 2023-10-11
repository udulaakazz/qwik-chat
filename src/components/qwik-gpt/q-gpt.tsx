import { server$ } from "@builder.io/qwik-city";
import type { ChatMessage } from "./streaming-gpt";
import { chatCompletion } from "./streaming-gpt";
// import type OpenAI from "openai";

export const qwikGPT = server$(async function* (query: ChatMessage[]) {
  try {
    const model = "gpt-3.5-turbo";

    const generator = chatCompletion(this.env.get("OPENAI_API_KEY")!, {
      model: model,
      temperature: 0,
      messages: [
        {
          role: "system",
          content: "You are helpful assistant.",
        },
        ...query,
      ],
    });

    let output = "";
    for await (const chunk of generator) {
      output += chunk;
      yield chunk as string;
    }
    return output;
  } catch (e) {
    console.error(e);
  }
});

export function normalizeLine(line: string) {
  line = line.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  line = line.toLowerCase();
  line = line.replaceAll("`", "");
  line = line.replaceAll("*", "");
  line = line.replaceAll("_", " ");
  line = line.replaceAll("#", "");
  line = line.replaceAll("-", " ");
  line = line.replaceAll("...", ".");
  line = line.replaceAll(">", "");
  line = line.replaceAll("<", "");
  line = line.replaceAll("..", ".");
  line = line.replaceAll("  ", " ");
  line = line.trim();
  return line;
}
