import Home from "../pages/home/home.js";
import NotFoundPage from "../pages/notFound/not-found.js";
import CodesPage from "../pages/codes/codes.js";
import {AppUserStore, UserActions} from "../stores/user/userStore.js";
import {AppEventMaker} from "./eventMaker.js";
import {AppDispatcher} from "./dispathcer.js";
import {AuthPage} from "../pages/auth/auth.js";
import {UserStoreEvents} from "../stores/user/events.js";

class Router {
    #currentUrl;
    #currentPage;
    #pages;

    /**
     * Конструктор класса
     */
    constructor() {
        this.#currentUrl = window.location.pathname;
        this.#currentPage = undefined;
        this.#pages = new Map();
    }

    /**
     * Инициализирует основные страницы сайта
     * @param root {HTMLElement} - родительский объект
     * @param config {Object} - глобальный конфиг
     */
    init(root, config){
        const homePage = new Home(root, config.homePage);
        this.registerPage("/", homePage);

        const codesPage = new CodesPage(root, config.codesPage);
        this.registerPage("/codes", codesPage);

        const authPage = new AuthPage(root, config.authPage);
        this.registerPage("/login", authPage);
        this.registerPage("/register", authPage);

        const notFoundPage = new NotFoundPage(root, config.notFoundPage);
        this.registerPage("/404", notFoundPage);

        AppDispatcher.dispatch({type: UserActions.CHECK_USER});

        AppEventMaker.subscribe(UserStoreEvents.SUCCESSFUL_LOGIN, () => {
            if (this.#currentPage?.needAuth === false) {
                this.redirect("/");
            }
        });

        AppEventMaker.subscribe(UserStoreEvents.USER_CHECKED, () => {
            if (this.#currentPage?.needAuth === true && !AppUserStore.IsAuthenticated()) {
                this.redirect("/");
            }
        });

        this.redirect(this.#currentUrl);

        window.addEventListener("popstate", () => {
            this.redirect(window.location.pathname);
        });
    }

    /**
     * Регистрирует страницу
     * @param href {string} адрес
     * @param page {Page} объект страницы
     */
    registerPage(href, page) {
        this.#pages[href] = page;
    }

    /**
     * Редиректит пользователя по переданному адресу
     * @param href {string} адрес
     */
    redirect(href) {
        if (href === "") href = "/";

        const page = this.#pages[href];

        if (page === undefined) {
            this.redirect("/404");
            return;
        }

        this.#currentPage?.remove();
        history.pushState({ href }, "", href);

        page.render();
        this.#currentPage = page;

        AppEventMaker.notify(UserActions.CHANGE_PAGE, href);
    }
}

export const router = new Router();
