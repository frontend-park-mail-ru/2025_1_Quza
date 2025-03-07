import {AppDispatcher} from "../../modules/dispathcer.js";
import {AppEventMaker} from "../../modules/eventMaker.js";
import {UserStoreEvents} from "./events.js";
import {router} from "../../modules/router.js";

/**
 * Хранилище для пользователей
 */
class UserStore {
    #state;


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
        return this.#state.isAuth;
    }

    /**
     * Регистрирует пользователя.
     * устанавливаем cookies.
     */
    async register(credentials) {
        console.log("Register credentials:", credentials);

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email: credentials.login,
                    password: credentials.password
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Не удалось зарегистрировать: ${response.status} - ${errorText}`);
            }

            AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_REGISTER);

            await this.login({ login: credentials.login, password: credentials.password });
        } catch (err) {
            console.error("[register] error:", err);
        }
    }

    /**
     * Авторизация пользователя.
     * устанавливаем HttpOnly cookies с access и refresh токенами.
     */
    async login(credentials){
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email: credentials.login,
                    password: credentials.password
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Ошибка входа: ${response.status} - ${errorText}`);
            }

            this.#state.isAuth = true;
            this.#state.username = credentials.login;

            router.redirect("/codes");
            AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_LOGIN);
        } catch (err) {
            console.error("[login] error:", err);
        }
    }

    /**
     * Выход из аккаунта.
     * Отправляем запрос с cookies, сервер удалит cookies, а клиент обновит состояние.
     */
    async logout() {
        try {
            const response = await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({})
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Ошибка логаута: ${response.status} - ${errorText}`);
            }

            this.#state.isAuth = false;
            this.#state.username = "";

            router.redirect("/");
            AppEventMaker.notify(UserStoreEvents.LOGOUT);
        } catch (err) {
            console.error("[logout] error:", err);
        }
    }

    /**
     * Проверка авторизации пользователя.
     * Запрос отправляется с cookies, сервер проверяет их и возвращает профиль пользователя.
     */
    async checkUser() {
        try {
            const response = await fetch("http://localhost:8080/user/profile", {
                method: "GET",
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                this.#state.isAuth = true;
                this.#state.username = data.email;
                AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_LOGIN);
            } else if (response.status === 401) {
                console.log("Профиль недоступен (401). Попробуем refresh-токен...");
                const refreshed = await this.tryRefreshToken();
                if (refreshed) {
                    return await this.checkUser();
                } else {
                    this.#state.isAuth = false;
                }
            } else {
                console.log("Профиль недоступен:", response.status);
                this.#state.isAuth = false;
            }
        } catch (err) {
            console.log("[checkUser] error:", err);
            this.#state.isAuth = false;
        } finally {
            AppEventMaker.notify(UserStoreEvents.USER_CHECKED);
        }
    }

    /**
     * Попытка обновления токенов через refresh-токен.
     * Запрос отправляется с cookies.
     */
    async tryRefreshToken() {
        try {
            const response = await fetch("http://localhost:8080/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({})
            });

            if (!response.ok) {
                console.log("Не удалось обновить токены:", response.status);
                return false;
            }

            return true;
        } catch (err) {
            console.log("[tryRefreshToken] error:", err);
            return false;
        }
    }
}

export const AppUserStore = new UserStore();

export const UserActions = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    LOGOUT: "LOGOUT",
    CHANGE_PAGE: "CHANGE_PAGE",
    CHECK_USER: "CHECK_USER"
};
