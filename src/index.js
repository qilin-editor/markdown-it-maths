import parseAsciiMath from "./parser/asciimath";
import parseKaTeX from "./parser/katex";
import renderKaTeX from "./renderer/katex";

export default function (md) {
    const ciClone = md.renderer.rules.code_inline.bind(md.renderer.rules);
    const feClone = md.renderer.rules.fence.bind(md.renderer.rules);

    // Inline math:
    md.renderer.rules.code_inline = (tokens, idx, options, env, slf) => {
        tokens[idx].content = parseAsciiMath(tokens[idx].content);
        tokens[idx].content = parseKaTeX(tokens[idx].content);

        return ciClone(tokens, idx, options, env, slf);
    };

    // Fenced math block:
    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        if (tokens[idx].info === "katex") {
            return renderKaTeX(tokens[idx].content);
        }

        if (tokens[idx].info === "math") {
            return renderKaTeX(parseAsciiMath(tokens[idx].content, true));
        }

        return feClone(tokens, idx, options, env, slf);
    };
}
