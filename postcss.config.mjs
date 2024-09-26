import autoprefixer from "autoprefixer";
import prefixer from "postcss-prefix-selector";
import tailwindcss from "tailwindcss";

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    prefixer({
      prefix: `[data-chat-widget]`,
      transform: function (prefix, selector, prefixedSelector, filePath, rule) {
        if (!rule.nodes.length) {
          return selector;
        }

        if (selector.startsWith(prefix)) {
          return selector;
        }
        // Skip prefixing for styles from node_modules
        if (filePath.match(/node_modules/)) {
          return selector;
        }
        if (selector.match(/^(html|body)/)) {
          return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
        }

        const annotation = rule.prev();
        if (
          annotation?.type === "comment" &&
          annotation.text.trim() === "no-prefix"
        ) {
          return selector; // Do not prefix style rules that are preceded by: /* no-prefix */
        }

        if (selector === "body") {
          return "body" + prefix;
        }
        return prefixedSelector;
      },
    }),
  ],
};
