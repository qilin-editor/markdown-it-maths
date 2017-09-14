import asciimath2latex from "asciimath-to-latex";

export default function (code, prefix = true) {
    if (prefix) {
        return `katex ${asciimath2latex(code.substr(4, code.length - 2))}`;
    }

    return asciimath2latex(code);
}
