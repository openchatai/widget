import autoprefixer from 'autoprefixer';
import prefixer from 'postcss-prefix-selector';
import tailwindcss from 'tailwindcss';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    prefixer({
      prefix: `[data-opencx-widget]`,
      transform: (prefix, selector, prefixedSelector, filePath) => {
        if (selector === ':root') {
          return selector; // Don't prefix :root selector
        }
        if (selector.startsWith(prefix)) {
          return selector;
        }
        // Skip prefixing for styles from node_modules
        if (filePath.match(/node_modules/)) {
          return selector;
        }
        return prefixedSelector;
      },
    }),
  ],
};
