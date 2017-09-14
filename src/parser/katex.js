import katex from "katex";

function renderToString(code) {
    try {
        return katex.renderToString(code);
    } catch (err) {
        return `<code class="maths-formula-error">${err}</code>`;
    }
}

export default function (code) {
    return renderToString(code.substr(5, code.length - 2));
}
