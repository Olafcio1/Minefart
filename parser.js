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
