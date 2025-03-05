import "../../../build/header.js";
import {AppEventMaker} from "../../modules/eventMaker.js";
import {UserStoreEvents} from "../../stores/user/events.js";
import {AppUserStore} from "../../stores/user/userStore.js";
import {router} from "../../modules/router.js";
import {Button} from "../button/button.js";
import {Clickabletext} from "../clickable-text/clickable-text.js";
import {SettingsPanel} from "../settings-panel/settings-panel.js";
import {Logo} from "../logo/logo.js";

export class Header {
    #parent;
    #config;

    #logo;

    #menu;

    #authPageLink;

    #settingsPanel;
    #clickabletext1;
    #clickabletext2;
    #clickabletext3;
    #clickabletext4;
    #clickabletext5;

    /**
     * Конструктор класса
     * @param parent {HTMLElement} - родительский элемент
     * @param config {Object} - пропсы
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * Возвращает HTML элемент компонента
     * @returns {HTMLElement}
     */
    get self () {
        return document.getElementById("header");
    }

    /**
     * Подписка на события
     * При успешном логине - удалить ссылку на страницу авторизации и вывести профиль пользователя
     * При логауте - удалить профиль пользователя и вывести ссылку на страницу авторизации
     */
    #addEventListeners(){
        AppEventMaker.subscribe(UserStoreEvents.SUCCESSFUL_LOGIN, () => {
            if (this.#settingsPanel === undefined) {
                this.#settingsPanel = new SettingsPanel(document.querySelector(".right-container"), this.#config.settings);
            }
            this.#settingsPanel.render();

            this.#authPageLink.self.classList.add("hidden");
        });

        AppEventMaker.subscribe(UserStoreEvents.CHANGE_PAGE, (href) => {
            console.log("CHANGE_PAGE");
            console.log(href);
            if (href === "/") {
                if (!AppUserStore.IsAuthenticated()) {
                    this.#authPageLink.self.classList.remove("hidden");
                }
            } else {
                this.#authPageLink.self.classList.add("hidden");
            }
            //чисто тест очистки содержимого кнопок хедера при изменении страницы (типо текст только по одной ссылке есть)
            if (href === "/codes1") {
                if (this.#clickabletext1===undefined){
                  this.#clickabletext1 = new Clickabletext(document.querySelector(".right-container1"), this.validateData,"+ Код");
                  this.#clickabletext1.render();
                }
                if (this.#clickabletext2===undefined){
                    this.#clickabletext2 = new Clickabletext(document.querySelector(".right-container2"), this.validateData,"+ Текст");
                    this.#clickabletext2.render();
                  }
                  if (this.#clickabletext3===undefined){
                    this.#clickabletext3 = new Clickabletext(document.querySelector(".right-container3"), this.validateData,"Скачать");
                    this.#clickabletext3.render();
                  }
                  if (this.#clickabletext4===undefined){
                    this.#clickabletext4 = new Clickabletext(document.querySelector(".right-container4"), this.validateData,"Поделиться");
                    this.#clickabletext4.render();
                  }
                  if (this.#clickabletext5===undefined){
                    this.#clickabletext5 = new Clickabletext(document.querySelector(".right-container5"), this.validateData,"Удалить");
                    this.#clickabletext5.render();
                  }
            } else {
                if (this.#clickabletext1!==undefined){
                    document.querySelector(".right-container1").removeChild(document.querySelector(".right-container1").querySelector(".clickable-text"))
                    this.#clickabletext1=undefined
                }
                if (this.#clickabletext2!==undefined){
                    document.querySelector(".right-container2").removeChild(document.querySelector(".right-container2").querySelector(".clickable-text"))
                    this.#clickabletext2=undefined
                }
                if (this.#clickabletext3!==undefined){
                    document.querySelector(".right-container3").removeChild(document.querySelector(".right-container3").querySelector(".clickable-text"))
                    this.#clickabletext3=undefined
                }
                if (this.#clickabletext4!==undefined){
                    document.querySelector(".right-container4").removeChild(document.querySelector(".right-container4").querySelector(".clickable-text"))
                    this.#clickabletext4=undefined
                }
                if (this.#clickabletext5!==undefined){
                    document.querySelector(".right-container5").removeChild(document.querySelector(".right-container5").querySelector(".clickable-text"))
                    this.#clickabletext5=undefined
                }
            }
        });

        AppEventMaker.subscribe(UserStoreEvents.LOGOUT, () => {
            console.log("LOGOUT");

            this.#settingsPanel.remove();

            if (this.#authPageLink === undefined) {
                this.#authPageLink = new Button(this.#menu, this.#config.menu.auth, this.handleButtonClick);
                this.#authPageLink.render();
            } else {
                this.#authPageLink.self.classList.remove("hidden");
            }
        });
    }

    /**
     * Перенаправление пользователя на страницу авторизации
     */
    handleButtonClick = () => {
        router.redirect("/login");
    };

    /**
     * Рендеринг хедера
     */
    render() {
        this.#parent.insertAdjacentHTML(
            "afterbegin",
            window.Handlebars.templates["header.hbs"](this.#config)
        );

            //  this.#clickabletext = new Clickabletext(document.querySelector(".right-container1"), this.validateData);
            //             this.#clickabletext.render();
        this.#logo = new Logo(document.querySelector(".logo-container"), this.#config.logo);
        this.#logo.render();


        const rightContainer = document.querySelector(".right-container");

        this.#menu = document.createElement("div");
        this.#menu.className = "menu-container";

        rightContainer.appendChild(this.#menu);

        if (AppUserStore.IsAuthenticated()) {
            this.#settingsPanel = new SettingsPanel(document.querySelector(".right-container"), this.#config.settings);
            this.#settingsPanel.render();
        } else {
            this.#authPageLink = new Button(this.#menu, this.#config.menu.auth, this.handleButtonClick);
            this.#authPageLink.render();
        }

        this.#addEventListeners();

    }
}
