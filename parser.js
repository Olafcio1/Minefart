// In VS Code, select all the code/* files as CoffeeScript.
// It's ECMAScript 2024 XD, but who cares.

(async function() {
    var src = (await new Promise(rsv => GM_xmlhttpRequest({
        method: "GET",
        url: server + "/code/main.js",
        onload: rsv
    }))).responseText;
    let yapped = src
        // Java fors -> for of
        .replaceAll(/for \((var |let |const |)(.+) : (.*)\)/g, "for ($1$2 of $3)")
        // PHP-similar fors -> for of
        .replaceAll(/for \((.*) as (.+)\)/g, "for (let $2 of $1)")
        // PHP-similar index => value fors -> for in + def
        .replaceAll(/for \((.*) as (.+) => (.+)\) {/g, "for (let $2 in $1) {let $3=$1[$2];")
    ;

    let full = [];

    let matches = {
        "namespace": /^namespace (.+) {/,
        "staticvar": /^static (.*)/,
        "classdef": /^class (.+)[| extends (.+)][| implements (.+)] {/,
        "interfacedef": /^interface (.+)[| extends (.+)] {/,
        "privatefield": /^private (.+) = (.*)/
    };
    let inside = [];
    let privateFields = [];

    let inString = false;
    let /** @type {String[]} */ yappedLines = yapped.replaceAll("\r", "").split("\n");
    for (let line of yappedLines) {
        if (inString) {
            if (line.includes('"'))
                inString = false;
            full.push(line);
            continue;
        } else if (line.includes('"')) {
            inString = true;
            full.push(line);
            continue;
        }
        line = line.trim();
        if (line.startsWith("#")) {
            continue;
        } else if (line == "}") {
            inside.pop();
            privateFields.pop();
        } else for (let [k, m] of matches) {
            let r = m.exec(line);
            if (r)
                if (k == "namespace") {
                    inside.push("namespace");
                    privateFields.push([]);
                } else if (k == "staticvar") {
                    if (inside[inside.length - 1] == "namespace")
                        throw new Error("Static field in a namespace");
                } else if (k == "classdef") {
                    inside.push("class");
                    privateFields.push([]);
                    if (["namespace", "class"].includes(inside[inside.length - 1]))
                        line = `${r[1]} = class ${r[1]}${r[2] ? ` extends ${r[2]}` : ""}`;
                } else if (k == "interfacedef") {
                    inside.push("interface");
                    privateFields.push([]);
                } else if (k == "privatefield") {
                    privateFields[inside[inside.length - 1]].push(r[1]);
                    line = `#${r[1]} = ${r[2]}`;
                }
            else if (line.startsWith("{")) {
                inside.push("object");
                privateFields.push([]);
            } else for (let f of privateFields) {
                line = line.replaceAll(f, "#f");
            }
        }
        if (inside[inside.length - 1] != "interface")
            full.push(line);
    }
    let final = full.join("\n");
    (new Function("const GM_xmlhttpRequest=arguments[0];(async function(){\n" + final + "\n})();"))(GM_xmlhttpRequest);
    // eval("delete src;(async function(){\n" + yapped + "\n})();");
})();
