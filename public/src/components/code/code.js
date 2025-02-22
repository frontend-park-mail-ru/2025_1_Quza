import "../../../build/code.js"

export class Code {
    #parent;

    #config;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const tmp = document.createElement('div');
        const template = Handlebars.templates["code.hbs"];
        tmp.innerHTML = template(this.#config.code);
        this.#parent.appendChild(tmp.firstElementChild);
    }
}