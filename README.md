<div align="center">
  <h1>markdown-it-maths</h1>

[![Greenkeeper badge](https://badges.greenkeeper.io/qilin-editor/markdown-it-maths.svg)](https://greenkeeper.io/)
[![Build Status](https://img.shields.io/travis/qilin-editor/markdown-it-maths.svg)](https://travis-ci.org/qilin-editor/markdown-it-maths/)
[![npm version](https://img.shields.io/npm/v/markdown-it-maths.svg)](https://www.npmjs.com/package/markdown-it-maths)
[![npm downloads](https://img.shields.io/npm/dt/markdown-it-maths.svg)](https://www.npmjs.com/package/markdown-it-maths)
  <br>

**markdown-it-maths** is a [markdown-it](https://github.com/markdown-it/markdown-it) plugin for processing and rendering [KaTeX](https://github.com/Khan/KaTeX) and [AsciiMath](https://github.com/asciimath/asciimathml) directly into your document. It ships with all the fonts and stylesheets required for an offline usage.
</div>

<h2 align="center">Installation</h2>

```bash
$ npm install markdown-it-maths
```

<h2 align="center">Usage</h2>

```javascript
// Create a markdown-it instance:
const md = require("markdown-it")();

// …and use maths without any configuration required!
md.use(require("markdown-it-maths"));
```

<h2 align="center">Syntax</h2>

- **AsciiMath** inline syntax:
    ```
    Lorem ipsum `math a/b + c/d = e/f` dolor stuff.
    ```

- **KaTeX** inline syntax:
    ```
    Lorem ipsum `katex \frac{a}{b} + \frac{c}{d} = \frac{e}{f}` dolor stuff.
    ```

- **AsciiMath** block syntax:
    ```
     Lorem ipsum dolor stuff:

     ```math
     a/b + c/d = e/f
     ```
    ```

- **KaTeX** block syntax:
    ```
     Lorem ipsum dolor stuff:

     ```katex
     \frac{a}{b} + \frac{c}{d} = \frac{e}{f}
     ```
    ```
