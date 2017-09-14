import asciimath2latex from "asciimath-to-latex";

export default function (code, force = false) {
    if (!force && code.startsWith("math")) {
        return `katex ${asciimath2latex(code.substr(4, code.length - 2))}`;
    }

    if (force) {
        return asciimath2latex(code);
    }

    return code;
}
