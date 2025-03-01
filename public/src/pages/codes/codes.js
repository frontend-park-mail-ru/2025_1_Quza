import "../../../build/codes.js";
import {Code} from "../../components/code/code.js";
import Page from "../page.js";
import {CodeEditor} from "../../components/code-editor/code-editor.js";
import {AppCodesStore} from "../../stores/codes/codesStore.js";
import {SearchBar} from "../../components/search-bar/search-bar.js";
import {AppEventMaker} from "../../modules/eventMaker.js";
import {CodesStoreEvents} from "../../stores/codes/events.js";

export default class CodesPage extends Page {
    #codesContainer;

    #codesEditor;

    #searchBar;

    /**
     * Рендеринг списка программ
     * @param codes
     * @param reset {boolean}
     */
    #renderCodes = (codes, reset=false) => {
        console.log("renderCodes");
        if (reset){
            this.#codesContainer.innerHTML = "";
        }

        if (codes.length > 0) {
            for (const code of codes) {
                console.log(code);
                const codeClass = new Code(this.#codesContainer, code);
                codeClass.render();
            }

            let hasVerticalScrollbar = this.#codesContainer.scrollHeight > this.#codesContainer.clientHeight;
            hasVerticalScrollbar && this.createObserver();

        } else if (AppCodesStore.codes.length === 0) {
            const h3 = document.createElement("h1");
            h3.innerText = "нет проектов";
            h3.className = "not-found-label";
            this.#codesContainer.append(h3);
        }
    };

    /**
     * Инициализация обсервера для динамической пагинации проектов
     */
    createObserver() {
        let observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        AppCodesStore.loadCodes();
                        observer.unobserve(entry.target);
                    }
                });
            });

        observer.observe(this.#codesContainer.querySelector(".code-container:last-child"));
    }

    /**
     * Очистка мусора
     */
    remove() {
        AppCodesStore.clean();
        this.#searchBar.remove();
        this.#codesEditor.remove();
        this.#unsubscribeFromEvents();
        super.remove();
    }

    /**
     * Срабатывает при клике по проекту
     * @param code {HTMLElement}
     */
    selectCode = (code) => {
        AppCodesStore.unselectCode();
        AppCodesStore.fetchCode(code);
        code.classList.add("selected");
    };

    /**
     * Подписка на ивенты
     */
    #subscribeToEvents() {
        AppEventMaker.subscribe(CodesStoreEvents.CODES_RECEIVED, this.#renderCodes);
    }

    /**
     * Отписка от ивентов
     */
    #unsubscribeFromEvents() {
        AppEventMaker.subscribe(CodesStoreEvents.CODES_RECEIVED, this.#renderCodes);
    }

    /**
     * Рендеринг страницы
     */
    render() {
        this.parent.insertAdjacentHTML(
            "afterbegin",
            window.Handlebars.templates["codes.hbs"](this.config)
        );

        this.#codesContainer = document.querySelector(".codes-container");

        this.#codesContainer.addEventListener("click", (e) => {
            let id = undefined;

            if (e.target.matches(".code-container")) {
                id = e.target.id;
            } else if (e.target.matches(".code-container *")) {
                id = e.target.parentNode.id;
            }

            if (id !== undefined) {
                this.self.classList.add("selected");

                this.selectCode(document.getElementById(id));
            }
        });

        this.#searchBar = new SearchBar(this.self.querySelector("aside"), this.config.searchBar);
        this.#searchBar.render();

        this.#codesEditor = new CodeEditor(this.self, this.config.codeEditor);
        this.#codesEditor.render();

        document.title = "Мои проекты";
        this.#subscribeToEvents();

        AppCodesStore.init();
    }
}