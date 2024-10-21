import { css, CSSObject } from "styled-components";
import { RuleSet, Styles } from "styled-components/dist/types";

const size = (w: string | number) => css`
    width: ${w};
    height: ${w};
`;

const flexCenter = () => css`
    display: flex;
    align-items: center;
    justify-content: center;
`

// mobile first
const breakpoints = {
    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
} as const;

type BreakPoints = keyof typeof breakpoints;

/**
 * Example
 * const styles = css`
 *    color: red;
 *   ${responsive(['sm', 'md'], css`
 *      color: blue;
 *  `)}
 * `
 * @param bps 
 * @param styles 
 * @returns 
 */
const responsive = (bps: Array<BreakPoints>, styles: RuleSet<object>) =>  {
    return css`
        ${bps.map(bp => {
        return css` @media (min-width: ${breakpoints[bp]}) {
                    ${styles}
                }
            `
    })}
    `
}

export {
    size,
    flexCenter,
    responsive,
}