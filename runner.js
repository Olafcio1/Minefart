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
// @connect      localhost
// @downloadURL  https://raw.githubusercontent.com/Olafcio1/Minefart/main/runner.js
// @updateURL    https://raw.githubusercontent.com/Olafcio1/Minefart/main/runner.js
// ==/UserScript==

function parseHeaders(raw) {
    var h = {};
    raw = raw.split("\r\n");
    for (let l of raw) {
        let n = l.substring(0, l.indexOf(":"));
        let v = l.substring(l.indexOf(":") + 2);
        h[n] = v;
    }
    return h;
}

/**
 * A web-compatible fetch function.
 * @param {String} url The URL address to fetch.
 * @param {Object} opts The fetch options.
 */
async function fetch(url, opts = {method: "GET"}) {
    if (typeof opts.body !== 'undefined')
        opts.data = opts.body;
    let r = await GM.xmlHttpRequest({
        url: url,
        ...opts
    });
    let headers = parseHeaders(r.responseHeaders);
    return {
        text: () => r.responseText,
        json: () => JSON.parse(r.responseText),
        blob: () => URL.createObjectURL(new Blob([r.responseText], {type: headers["content-type"]})),
//        xml: () => r.responseXML,
        status: r.status,
        statusText: r.statusText,
        url: r.finalUrl,
        headers: headers
    };
}

const inDev = true;
const server = inDev ? "http://localhost:2595" : "https://raw.githubusercontent.com/Olafcio1/Minefart/main";

fetch(
    server + "/parser.js"
).then(async r => {
    eval(await r.text());
});
