import katex from "katex";

export default function (code, text = "") {
    // Two or more consecutive new lines mean a new formula
    code.split(/(?:\n\s*){2,}/).forEach((line) => {
        try {
            text += katex.renderToString(line.trim(), { displayMode: true });
        } catch (err) {
            text += `<pre class="maths-formula-error">${err}</pre>`;
        }
    });

    return `<div class="maths-formula">${text}</div>`;
}
