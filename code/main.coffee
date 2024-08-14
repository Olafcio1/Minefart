interface FileManager {
    static async function open(path, mode);
}

namespace Minefort {
    class Server {
        #id;
        constructor(id) {
            this.#id = id;
        }

        static getCurrent() {
            // let r = /^\/servers\/(.+\/).*/.exec(location.pathname)[1];
            let r = location.pathname.substring(9);
            r = r.substring(0, r.indexOf("/"));
            return new this(r.substring(0, r.length - 2));
        }

        async #request(path, method = "POST", body = null, headers = {}) {
            if (typeof body === 'object') {
                headers["Content-Type"] ||= "application/json";
                headers["Accept"] ||= "application/json, text/plain, */*";
            }
            return await fetch(`https://api.minefort.com/v1/server/${this.#id}${path}`, {
                "headers": headers,
                "referrerPolicy": "same-origin",
                "body": body,
                "method": method,
                "mode": "cors",
                "credentials": "include"
            });
        }

        async start() {
            await this.#request("/start", "OPTIONS")
            return await this.#request("/start");
        }

        async hibernate() {
            return await this.#request("/sleep");
        }

        async delete(password) {
            return await this.#request("delete", "DELETE", {password});
        }

        class Files implements FileManager {
            private mayCreate;
            private canRead;
            private canWrite;

            /**
             * Opens a file. Similar to Unix's file pointers, but really it's not.
             * @param {String} path 
             * @param {String} mode 
             */
            static async open(path, mode = "r+") {
                if (mode == "")
                    throw Exception("You can't open a file with empty mode!");
                this.canRead = mode.includes("r") || mode.includes("+");
                this.canWrite = mode.includes("w") || mode.includes("+");
                this.mayCreate = mode.includes("w");
            }
        }
    };
};

var observeFunc = records => {
    for (records as r) {
        if (r.target.innerText.toLowerCase().includes("your server is almost ready!")) {
            r.target.remove();
            Minefort.Server.getCurrent().start();
        } else r.addedNodes.forEach(n => {
            console.log(n);
        });
    };
};
var observer = new MutationObserver(observeFunc);
observer.observe(document.body, {subtree: true, childList: true});

# let ssclicked = false;
# addEventListener("mousedown", ev => {
#     if (ev.target.innerText == "Start server") {
#         ev.stopImmediatePropagation();
#         ssclicked = true;
#         Minefort.Server.getCurrent().start();
#     }
# }, true);

# addEventListener("mouseup", ev => {
#     if (ssclicked) {
#         ev.stopImmediatePropagation();
#         ssclicked = false;
#     }
# }, true);

console.log(Minefort);
await new Promise(rsv => document.addEventListener("load", () => setTimeout(rsv, 500), {once: true}));
observeFunc([{target: document.body, addedNodes: [...document.body.querySelectorAll("*")]}]);
