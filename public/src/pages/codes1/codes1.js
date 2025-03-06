import "../../../build/codes1.js";
import {Code} from "../../components/code/code.js";
import Page from "../page.js";
import {CodeEditor} from "../../components/code-editor/code-editor.js";
import {AppCodesStore} from "../../stores/codes/codesStore.js";
import {SearchBar} from "../../components/search-bar/search-bar.js";
import {AppEventMaker} from "../../modules/eventMaker.js";
import {CodesStoreEvents} from "../../stores/codes/events.js";
import { Clickabletext } from "../../components/clickable-text/clickable-text.js";
import { TextContainer } from "../../components/text-container/text-container.js";

/**
     * Страница одного проекта
     */
export default class CodesPage1 extends Page {
    #codesContainer;

    #codesEditor;

    #searchBar;

    #clickabletext;
    #text;

    /**
     * Рендеринг списка блоков
     * @param codes
     * @param reset {boolean}
     */
    #renderCodes = (codes, reset=false) => {
        console.log("renderCodes1");
        if (reset){
            this.#codesContainer.innerHTML = "";
        }
        for (const code of codes){
        if ((code.id==="codes1")&&(code.data.length > 0)) {
            for (const block of code.data) {
                let te=new TextContainer(document.querySelector(".codes-container1"),{content:block});
                te.render();
            }
            let hasVerticalScrollbar = this.#codesContainer.scrollHeight > this.#codesContainer.clientHeight;
            hasVerticalScrollbar && this.createObserver();
            break;
        } else if (AppCodesStore.codes.length === 0) {
            const h3 = document.createElement("h1");
            h3.innerText = "нет блоков";
            h3.className = "not-found-label";
            this.#codesContainer.append(h3);
        }
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

        observer.observe(this.#codesContainer.querySelector(".code-container1:last-child"));
    }

    /**
     * Очистка мусора
     */
    remove() {
        AppCodesStore.clean();
        //this.#searchBar.remove();
        //this.#codesEditor.remove();
        this.#unsubscribeFromEvents();
        super.remove();
    }

    /**
     * Срабатывает при клике по элементу
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
        AppEventMaker.unsubscribe(CodesStoreEvents.CODES_RECEIVED, this.#renderCodes);
    }

    /**
     * Рендеринг страницы
     */
    render() {
        this.parent.insertAdjacentHTML(
            "afterbegin",
            window.Handlebars.templates["codes1.hbs"](this.config)
        );

        this.#codesContainer = document.querySelector(".codes-container1");

        document.title = "Мои проекты";
        this.#subscribeToEvents();

        AppCodesStore.init();
    }
}