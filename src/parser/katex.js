import katex from "katex";

function renderToString(code) {
    try {
        return katex.renderToString(code);
    } catch (err) {
        return `<code class="maths-formula-error">${err}</code>`;
    }
}

export default function (code, force = false) {
    if (!force && code.startsWith("katex")) {
        return renderToString(code.substr(5, code.length - 2));
    }

    if (force) {
        return renderToString(code);
    }

    return code;
}
