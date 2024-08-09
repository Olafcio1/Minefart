namespace Minefort {
    inside class Server {
        #id;
        constructor(id) {
            this.#id = id;
        }

        static getCurrent() {
            return new Minefort.Server(/\/servers\/(.+).*/.exec(location.pathname)[1]);
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

addEventListener("mousedown", ev => {
    if (ev.target.innerText == "Start server") {
        //            ev.preventDefault();
        ev.stopImmediatePropagation();
        Minefort.Server.getCurrent().start();
    }
}, true);

await new Promise(rsv => addEventListener("DOMContentLoaded", rsv, {once: true}));
