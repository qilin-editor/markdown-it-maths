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
            code = parseKaTeX(code);
        }

        return ciClone(tokens, idx, options, env, slf);
    };

    // Fenced math block:
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        let code = tokens[idx].content.trim();

        if (tokens[idx].info === "katex" || tokens[idx].info === "latex") {
            return renderKaTeX(code);
        }

        if (tokens[idx].info === "math") {
            code = code.split(/(?:\n\s*){2,}/).map(item => parseAsciiMath(item, false)).join("\n\n");

            return renderKaTeX(code);
        }

        return feClone(tokens, idx, options, env, slf);
    };
}
