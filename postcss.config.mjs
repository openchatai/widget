// postcss.config.mjs
import UnoCSS from '@unocss/postcss'
import prefixer from 'postcss-prefix-selector'

const removeEmptySelectors = () => {
    return {
        postcssPlugin: 'remove-unocss-comments',
        Rule(rule) {
            // remove the ruls if it contains #--unocss-layer-end, which is a comment added by unocss
            // sometimes it won't be excatly #--unocss-layer-end, it may contain some other text
            if (rule.selector.match(/#--unocss-layer-end/)) {
                rule.remove();
            }
        }
    };
};

export default {
    plugins: [
        UnoCSS(),
        prefixer({
            prefix: `[data-chat-widget]`,
            transform: function (prefix, selector, prefixedSelector, filePath, rule) {
                if (selector === 'html') {
                    return `html${prefix}`
                }

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
                if (annotation?.type === 'comment' && annotation.text.trim() === 'no-prefix') {
                    return selector; // Do not prefix style rules that are preceded by: /* no-prefix */
                }

                if (selector === 'body') {
                    return 'body' + prefix;
                }
                return prefixedSelector;
            }
        }),
        removeEmptySelectors(),
    ],
}