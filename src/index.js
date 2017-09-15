import "katex/dist/katex.min.css";

import parseAsciiMath from "./parser/asciimath";
import parseKaTeX from "./parser/katex";
import renderKaTeX from "./renderer/katex";

export default function (md) {
    const ciClone = md.renderer.rules.code_inline.bind(md.renderer.rules);
    const feClone = md.renderer.rules.fence.bind(md.renderer.rules);

    // Inline math:
    md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
        let code = tokens[idx].content;

        if (code.startsWith("math")) {
            code = parseAsciiMath(code);
        }

        if (code.startsWith("katex") || code.startsWith("latex")) {
            return parseKaTeX(code);
        }

        return ciClone(tokens, idx, options, env, slf);
    };

    // Fenced math block:
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const code = token.content.trim();

        if (token.info === "katex" || token.info === "latex") {
            return renderKaTeX(code);
        }

        if (token.info === "math") {
            return renderKaTeX(code.split(/(?:\n\s*){2,}/).map(l => parseAsciiMath(l, false)).join("\n\n"));
        }

        return feClone(tokens, idx, options, env, slf);
    };
}
