import "../../../build/text-container.js";
import { create_UUID } from "../../shared/uuid.js";

export class TextContainer {
    #parent;
    #props;
    #config;

    /**
     * Конструктор класса
     * @param parent {HTMLElement} - родительский элемент
     * @param config {Object} - пропсы
     */
    constructor(parent, config) {
        //this.#config.id=create_UUID();
        this.#parent = parent;
        this.#config = config;
        this.#props = {
            id: create_UUID(),
            content: this.#config.content
        };
    }

    /**
     * Возвращает HTML элемент кода программы
     * @returns {HTMLElement}
     */
    get self() {
        return document.getElementById(this.#config.id);
    }

    /**
     * Рендеринг одного проекта
     */
    render() {
        console.log(this.#props);
        this.#parent.insertAdjacentHTML(
            "beforeend",
            window.Handlebars.templates["text-container.hbs"](this.#props)
        );
    }
}