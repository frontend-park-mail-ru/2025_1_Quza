import {AppDispatcher} from "../../modules/dispathcer.js";
import {AppEventMaker} from "../../modules/eventMaker.js";
import {UserStoreEvents} from "./events.js";
import {router} from "../../modules/router.js";

class UserStore {
    #state;
    #fetchUserData;

    /**
     * Конструктор класса
     */
    constructor() {
        this.#state = {
            username: "",
            avatarUrl: "/src/assets/avatar.png",
            isAuth: false
        };
    }

    /**
     * Регистрирует ивенты
     */
    registerEvents(){
        AppDispatcher.register(async (action) => {
            switch (action.type){
                case UserActions.LOGIN:
                    await this.login(action.payload);
                    break;
                case UserActions.LOGOUT:
                    await this.logout();
                    break;
                case UserActions.REGISTER:
                    await this.register(action.payload);
                    break;
                case UserActions.CHECK_USER:
                    console.log("action handled");
                    await this.checkUser();
                    break;
            }
        });
    }

    /**
     * Возвращает логин пользователя
     * @returns {string}
     */
    get username() {
        return this.#state.username;
    }

    /**
     * Возвращает url аватарки пользователя
     * @returns {string}
     */
    get avatar() {
        return this.#state.avatarUrl;
    }

    /**
     * Возвращает true, если пользователь авторизован, иначе false
     * @returns {boolean}
     */
    IsAuthenticated() {
        console.log("IsAuthenticated");
        console.log(this.#state);
        return this.#state.isAuth;
    }

    /**
     * Выполняет авторизацию пользователя (MOCK)
     * @param credentials{{login: string, password: string}} принимает логин и пароль
     * @returns {Promise<void>}
     */
    async login(credentials){
        try {
            const res = { username: credentials.login };
            console.log("login successful (MOCK)");
            this.#state.isAuth = true;
            this.#state.username = res.username;
            router.redirect("/codes");
            AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_LOGIN);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Делает выход из аккаунта (MOCK)
     * @returns {Promise<void>}
     */
    async logout() {
        try {
            console.log("logout successful (MOCK)");
            this.#state.isAuth = false;
            this.#state.username = "";
            router.redirect("/");
            AppEventMaker.notify(UserStoreEvents.LOGOUT);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Выполняет регистрацию пользователя (MOCK)
     * @param credentials
     * @returns {Promise<void>}
     */
    async register(credentials) {
        try {
            const res = { username: credentials.login };
            console.log("signup successful (MOCK)");
            this.#state.isAuth = true;
            this.#state.username = res.username;
            router.redirect("/codes");
            AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_LOGIN);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Проверяет, авторизован ли пользователь (MOCK)
     * @returns {Promise<void>}
     */
    async checkUser(){
        try {
            const res = { username: "mockuser" };
            this.#state.isAuth = true;
            this.#state.username = res.username;
            AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_LOGIN);
        } catch (err) {
            console.log("не зареган (MOCK)");
            console.log(err);
        } finally {
            AppEventMaker.notify(UserStoreEvents.USER_CHECKED);
        }
    }
}

/**
 *
 * @type {UserStore}
 */
export const AppUserStore = new UserStore();

/**
 *
 * @type {{REGISTER: string, LOGOUT: string, CHANGE_PAGE: string, LOGIN: string, CHECK_USER: string}}
 */
export const UserActions = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    LOGOUT: "LOGOUT",
    CHANGE_PAGE: "CHANGE_PAGE",
    CHECK_USER: "CHECK_USER"
};