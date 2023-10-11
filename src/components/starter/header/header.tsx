import { component$ } from "@builder.io/qwik";
import styles from "./header.module.css";
import { QwikIcon } from "~/components/icons/qwik";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["px-16 py-5", styles.wrapper]}>
        <div class="flex items-center gap-4">
          <div class="inline-block">
            <a class="block h-10 w-10" href="/" title="qwik">
              <QwikIcon />
            </a>
          </div>
          <span class="inline-block text-4xl font-bold text-white">Qwik</span>
        </div>
        <ul>
          <li>
            <a
              href="https://qwik.builder.io/docs/components/overview/"
              target="_blank"
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href="https://qwik.builder.io/examples/introduction/hello-world/"
              target="_blank"
            >
              Examples
            </a>
          </li>
          <li>
            <a
              href="https://qwik.builder.io/tutorial/welcome/overview/"
              target="_blank"
            >
              Tutorials
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
