import {AppDispatcher} from "../../modules/dispathcer.js";
import {AppEventMaker} from "../../modules/eventMaker.js";
import {UserStoreEvents} from "./events.js";
import {router} from "../../modules/router.js";
import {toasts} from "../../modules/toasts.js";

/**
 * Константа, где указывается адрес сервера
 */
const HOST = "http://localhost:8080";

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
    registerEvents() {
        AppDispatcher.register(async (action) => {
            switch (action.type) {
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
     * Вспомогательный метод для парсинга ошибок в JSON
     * (если парсинг в JSON не удаётся, то возвращаем текст).
     */
    async parseError(response) {
        try {
            return await response.json();
        } catch (e) {
            return await response.text();
        }
    }

    /**
     * Регистрирует пользователя.
     * устанавливаем cookies.
     */
    async register(credentials) {
        try {
            const response = await fetch(`${HOST}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: credentials.login,
                    password: credentials.password,
                }),
            });

            if (!response.ok) {
                const errorData = await this.parseError(response);

                if (response.status === 401) {
                    toasts.error("Ошибка регистрации", "Возможно, вы уже зарегистрированы");
                } else {
                    toasts.error("Ошибка регистрации", `Статус: ${response.status}`);
                }

                throw new Error(`Не удалось зарегистрировать: ${response.status} - ${JSON.stringify(errorData)}`);
            }


            AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_REGISTER);

            await this.login({ login: credentials.login, password: credentials.password });
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Авторизация пользователя.
     * устанавливаем HttpOnly cookies с access и refresh токенами.
     */
    async login(credentials) {
        try {
            const response = await fetch(`${HOST}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: credentials.login,
                    password: credentials.password,
                }),
            });

            if (!response.ok) {
                const errorData = await this.parseError(response);

                if (response.status === 401) {
                    toasts.error("Ошибка авторизации", "Неверный логин или пароль");
                } else {
                    toasts.error("Ошибка входа", `Статус: ${response.status}`);
                }

                throw new Error(`Ошибка входа: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            this.#state.isAuth = true;
            this.#state.username = credentials.login;

            router.redirect("/codes");
            AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_LOGIN);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Выход из аккаунта.
     * Отправляем запрос с cookies, сервер удалит cookies, а клиент обновит состояние.
     */
    async logout() {
        try {
            const response = await fetch(`${HOST}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                const errorData = await this.parseError(response);

                if (response.status === 401) {
                    toasts.error("Ошибка логаута", "Вы не авторизованы");
                } else {
                    toasts.error("Ошибка логаута", `Статус: ${response.status}`);
                }

                throw new Error(`Ошибка логаута: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            this.#state.isAuth = false;
            this.#state.username = "";

            router.redirect("/");
            AppEventMaker.notify(UserStoreEvents.LOGOUT);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Проверка авторизации пользователя.
     * Запрос отправляется с cookies, сервер проверяет их и возвращает профиль пользователя.
     */
    async checkUser(attempt = 0) {
        const MAX_ATTEMPTS = 3;
        try {
            const response = await fetch(`${HOST}/user/profile`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                this.#state.isAuth = true;
                this.#state.username = data.email;
                AppEventMaker.notify(UserStoreEvents.SUCCESSFUL_LOGIN);

            } else if (response.status === 401 && attempt < MAX_ATTEMPTS) {

                if (this.#state.isAuth) {
                    const refreshed = await this.tryRefreshToken();
                    if (refreshed) {
                        return await this.checkUser(attempt + 1);
                    } else {
                        this.#state.isAuth = false;

                        toasts.error("Ошибка авторизации", "Сессия истекла. Войдите заново.");
                    }
                } else {
                    this.#state.isAuth = false;
                }

            } else {
                this.#state.isAuth = false;
                toasts.error("Ошибка", `Проверка профиля вернула статус: ${response.status}`);
            }

        } catch (err) {
            console.error(err);
            this.#state.isAuth = false;
            toasts.error("Ошибка сети", "Не удалось связаться с сервером");
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
            const response = await fetch(`${HOST}/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: null,
            });

            if (!response.ok) {
                const errorData = await this.parseError(response);
                console.error("Ошибка при рефреше токена:", errorData);
                return false;
            }

            return true;
        } catch (err) {
            console.error(err);
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
    CHECK_USER: "CHECK_USER",
};
