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
        let code = tokens[idx].content.trim();

        if (tokens[idx].info === "katex") {
            return renderKaTeX(code);
        }

        if (tokens[idx].info === "math") {
            code = code.split(/(?:\n\s*){2,}/).map(item => parseAsciiMath(item, true)).join("\n\n");

            return renderKaTeX(parseAsciiMath(code, true));
        }

        return feClone(tokens, idx, options, env, slf);
    };
}
