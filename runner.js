// ==UserScript==
// @name         Minefart
// @namespace    https://olafcio1.github.io
// @version      0.1
// @description  br0 make it b1tttter!!! Alright!
// @author       Olafcio
// @match        https://minefort.com/*
// @match        http://minefort.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minefort.com
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @connect      raw.githubusercontent.com
// @downloadURL  https://raw.githubusercontent.com/Olafcio1/Minefart/main/runner.js
// @updateURL    https://raw.githubusercontent.com/Olafcio1/Minefart/main/runner.js
// ==/UserScript==

fetch("https://raw.githubusercontent.com/Olafcio1/Minefart/main/parser.js").then(async r => {
    eval(await r.text());
});
