import {Code} from "../code/code.js";

export class CodesContainer {
    #parent;

    #config;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const tmp = document.createElement('div');
        const template = Handlebars.templates["codes.hbs"];
        tmp.innerHTML = template(this.#config.codes);
        this.#parent.appendChild(tmp.firstElementChild);


        const self = document.getElementById('codes-container');

        for (let i = 0; i < 3; i++) {
            const code = new Code(self, this.#config)
            code.render()
        }
    }
}
