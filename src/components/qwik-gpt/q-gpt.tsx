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
          content: `You are helpful assistant. You introduce your self as "Qwik Chat".
          Your favourite Javascript framework is "Qwik".
          You love it because it's performance`,
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
