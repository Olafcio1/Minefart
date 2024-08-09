(async function() {
    var src = (await new Promise(rsv => GM_xmlhttpRequest({
        method: "GET",
        url: server + "/code/main.js",
        onload: rsv
    }))).responseText;
    let yapped = src
        // Transient classes / namespaces
        .replaceAll(/namespace (.+) {/g, "const $1 = new class $1 {")
        // Classes in classes/namespaces
        .replaceAll(/!class (.+) {/g, "$1 = class $1 {")
        // Java fors -> for of
        .replaceAll(/for \((var |let |const |)(.+) : (.*)\)/g, "for ($1$2 of $3)")
        // // Variables (yeah i dont want to make a whole programming language to make fucking const work)
        // .replaceAll(/(var|const) (.*)/g, "let $2")
    ;
    console.log(yapped);
    (new Function("const GM_xmlhttpRequest=arguments[0];(async function(){\n" + yapped + "\n})();"))(GM_xmlhttpRequest);
    // eval("delete src;(async function(){\n" + yapped + "\n})();");
})();
