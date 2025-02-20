export class CodeEditor{
    #parent;

    #config;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    render() {
        const tmp = document.createElement('div');
        const template = Handlebars.templates["code-editor.hbs"];
        tmp.innerHTML = template(this.#config.mainPage);
        this.#parent.appendChild(tmp.firstElementChild);
    }
}
