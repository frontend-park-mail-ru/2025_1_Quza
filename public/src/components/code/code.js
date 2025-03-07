import "../../../build/code.js";
import {truncate} from "../../modules/utils.js";

/**
     * Один проект
     */
export class Code {
    #parent;
    #props;
    #config;

    /**
     * Конструктор класса
     * @param parent {HTMLElement} - родительский элемент
     * @param config {Object} - пропсы
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
        console.log(this.#config);
        this.#props = {
            id: this.#config.id,
            title: this.#config.title,
            content: truncate(this.#config.content, 50),
            create_time: this.#config.create_time,
            update_time: new Intl.DateTimeFormat("ru", {
                month: "short", day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hourCycle: "h23"
            }).format(new Date(this.#config.update_time)).replace(",", "")
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
            window.Handlebars.templates["code.hbs"](this.#props)
        );
    }
}