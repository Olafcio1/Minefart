namespace Minefort {
    !class Server {
        #id;
        constructor(id) {
            this.#id = id;
        }

        static getCurrent() {
            return new this(/\/servers\/(.+).*/.exec(location.pathname)[1]);
        }

        async start() {
            await fetch(`https://api.minefort.com/v1/server/${this.#id}/start`, {
                "headers": {},
                "referrerPolicy": "same-origin",
                "body": null,
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
            });
        }
    };
};

var observer = new MutationObserver(records => {
    for (records as r) {
        if (r.target.innerText.toLowerCase().includes("your server is almost ready!")) {
            r.target.remove();
            Minefort.Server.getCurrent().start();
        }
    };
});
observer.observe(document.body, {subtree: true, childList: true});

// let ssclicked = false;
// addEventListener("mousedown", ev => {
//     if (ev.target.innerText == "Start server") {
//         ev.stopImmediatePropagation();
//         ssclicked = true;
//         Minefort.Server.getCurrent().start();
//     }
// }, true);

// addEventListener("mouseup", ev => {
//     if (ssclicked) {
//         ev.stopImmediatePropagation();
//         ssclicked = false;
//     }
// }, true);

console.log(Minefort);
await new Promise(rsv => document.addEventListener("DOMContentLoaded", rsv, {once: true}));
