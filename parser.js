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
// ==/UserScript==

(async function() {
    var src = (await new Promise(rsv => GM_xmlhttpRequest({
        method: "GET",
        url: "https://raw.githubusercontent.com/Olafcio1/Minefart/main/code/main.js",
        onload: rsv
    }))).responseText;
    eval("delete src;(async function(){\n" + (src
         // Transient classes / namespaces
         .replaceAll(/namespace (.+) {/g, "const $1 = new class {")
         // Classes in classes/namespaces
         .replaceAll(/inside class (.+) {/g, "$1 = new class $1 {")) + "\n})();");
})();
