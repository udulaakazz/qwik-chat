import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { QwikGPT } from "~/components/qwik-gpt";

export default component$(() => {
  return (
    <>
      <div class="flex w-full flex-col items-center text-lg">
        <div class="text-center">
          <h1 class="text-6xl font-bold text-white">
            Qwik Chat - Qwik City App ⚡️
          </h1>
          <p class="mt-4">Powered by ChatGPT 3.5 turbo</p>
        </div>
        <div class="flex w-[70%] flex-col gap-5 pb-[30vh] pt-16">
          <QwikGPT />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik Chat",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
