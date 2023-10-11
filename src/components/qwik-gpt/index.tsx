import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { qwikGPT } from "./q-gpt";
import type { ChatMessage } from "./streaming-gpt";

type MessageStore = {
  messages: ChatMessage[];
};

export const QwikGPT = component$(() => {
  const message = useSignal("");
  const done = useSignal(false);

  const prompt = useSignal("");

  const store = useStore<MessageStore>({
    messages: [{ role: "user", content: "" }],
  });

  // const process = useComputed$(() => {
  //   const rawLines = message.value.split("\n");
  //   const lines: { type: string; [key: string]: any }[] = [];
  //   let insideCode = false;
  //   let accumulated = "";

  //   for (const line of rawLines) {
  //     const lineParsed = line.trim();

  //     if (insideCode) {
  //       if (lineParsed.startsWith("```")) {
  //         insideCode = false;
  //         lines.push({
  //           text: accumulated,
  //           language: "tsx",
  //           type: "",
  //         });
  //         accumulated = "";
  //       } else {
  //         accumulated += line + "\n";
  //       }
  //     } else {
  //       if (lineParsed.startsWith("```")) {
  //         lines.push({
  //           type: "div",
  //           text: accumulated, // Storing non-code content as plain text
  //         });
  //         accumulated = "";
  //         insideCode = true;
  //       } else {
  //         accumulated += line + "\n";
  //       }
  //     }
  //   }

  //   if (insideCode) {
  //     lines.push({
  //       text: accumulated,
  //       language: "tsx",
  //       type: "",
  //     });
  //   } else {
  //     lines.push({
  //       type: "div",
  //       text: accumulated, // Storing non-code content as plain text
  //     });
  //   }

  //   return lines;
  // });

  const handleSubmit = $(async () => {
    message.value = "";
    const query = prompt.value;
    prompt.value = "";
    store.messages = [...store.messages, { role: "user", content: query }];
    store.messages.push({ role: "assistant", content: "" }); //insert empty item to end of the array
    done.value = false;
    const response = await qwikGPT(store.messages);
    for await (const value of response) {
      if (typeof value === "string") {
        message.value += value;

        store.messages[store.messages.length - 1].role = "assistant"; //updating the last item of array
        store.messages[store.messages.length - 1].content += value; //updating the last item of array
      }
    }

    done.value = true;
  });

  return (
    <>
      {store.messages.map((message, index) =>
        message.role === "assistant" && message.content != "" ? (
          <div
            key={index}
            class="max-w-[65ch] self-start rounded-xl bg-blue-950 px-5 py-2 text-white"
          >
            {/* Formatting the message */}
            {message.content.split("\n").map((text, index) => {
              if (text === "") {
                return (
                  <p key={index} class="">
                    &nbsp;
                  </p>
                );
              } else {
                return (
                  <p key={index} class="">
                    {text}
                  </p>
                );
              }
            })}
          </div>
        ) : (
          message.content != "" && (
            <div
              key={index}
              class="max-w-[65ch] self-end rounded-xl bg-blue-200 px-5 py-2 text-blue-900"
            >
              <p class="">{message.content}</p>
            </div>
          )
        ),
      )}
      {/* Do something after stream stop */}
      {/* {done.value && (
        <div class="ai-rate flex items-center gap-5 rounded-2xl bg-blue-800 px-8 py-6">
          Anything After Done
        </div>
      )} */}
      <form
        onSubmit$={handleSubmit}
        class="fixed bottom-[2rem] flex w-[70%]"
        preventdefault:submit
      >
        <input
          autoFocus
          class="w-full rounded-2xl bg-blue-200 px-7 py-5 text-lg text-blue-950 placeholder:text-blue-500"
          type="text"
          name="prompt"
          placeholder="Ask me anything"
          bind:value={prompt}
        />
        <button
          class="ml-4 rounded-2xl bg-blue-950 px-7 py-5 text-lg text-blue-200"
          type="submit"
        >
          Ask
        </button>
      </form>
    </>
  );
});
