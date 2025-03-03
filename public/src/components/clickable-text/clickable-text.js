import "../../../build/clickable-text.js";
import { router } from "../../modules/router.js";
import {create_UUID} from "../../shared/uuid.js";

export class Clickabletext {
    #parent;
    #props = {
        id: "",
        content: "",
    };
    #onSubmit;

    /**
     * Конструктор класса
     * @param parent {HTMLElement} - родительский элемент
     * @param config {Object} - пропсы
     * @param onSubmit {Function} - колбэк-функция, срабатывающая при клике
     */
    constructor(parent, onSubmit,content) {
        this.id = create_UUID();
        this.#parent = parent;
        this.#props.id = this.id;
        this.#props.content = content;
        this.#onSubmit = onSubmit;
        
        console.log(this.#parent)
    }

    /**
     * Возвращает элемент кликабельного текста 
     * @returns {HTMLElement}
     */
    get self(){
        return document.getElementById(this.id);
    }

    /**
     * Подписка на событие клика по тексту
     */
    #addEventListeners(){
            this.self.addEventListener("click", (e) => {
                router.redirect("/codes1");
                e.preventDefault();
            });
    }

    /**
     * Отписка от события клика по тексту
     */
    #removeEventListeners(){
        if (this.#onSubmit !== undefined) {
            this.self.removeEventListener("click", this.#onSubmit);
        }
    }

    /**
     * Очистка
     */
    remove(){
        this.#removeEventListeners();
    }

    /**
     * Рендеринг компонента
     */
    render(){
        this.#parent.insertAdjacentHTML(
            "beforeend",
            window.Handlebars.templates["clickable-text.hbs"](this.#props)
        );

        this.#addEventListeners();
    }
}