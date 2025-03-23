import { router } from "yandex-maps";
import { apiConfig } from "../modules/api";
import { Api } from "../modules/api/src/api";
import { EventDispatcher, Listenable } from "../modules/observer";

export type User = {
    Username: string;
    Email: string;
    Password: string;
    Icon: string;
};

export const enum UserEvent {
    USER_LOGIN = "USER_LOGIN",
    USER_REG = "USER_REG",
    USER_LOGOUT = "USER_LOGOUT",
    USER_UPDATE = "USER_UPDATE",
    AUTH = "AUTH",
}

/**
 * Модель пользователя
 * @class
 */
export class UserModel implements Listenable<UserEvent> {
    /**
     * Пользователь
     */
    private user: User | null;
    private errorMsg: string | null;

    private events_: EventDispatcher<UserEvent>;
    get events(): EventDispatcher<UserEvent> {
        return this.events_;
    }

    /**
     * Конструктор
     */
    constructor() {
        this.events_ = new EventDispatcher<UserEvent>();
        this.user = null;
    }

    usersDiff(newUserData: { [index: string]: string }, oldUser: User | null) {
        const userDiff = {};
        if (oldUser) {
            for (const [key, value] of Object.entries(oldUser)) {
                if (newUserData[key] && newUserData[key] !== value) {
                    userDiff[key] = newUserData[key];
                }
            }
        }

        return userDiff;
    }

    /**
     * Получение пользователя
     * @returns {User} - пользователь
     */
    getUser(): User | null {
        return this.user;
    }

    /**
     * Получение сообщения об ошибке
     */
    getErrorMsg(): string | null {
        return this.errorMsg;
    }

    /**
     * Авторизация по cookie
     * @async
     */
    async auth() {
        console.log(this.user)
        if (this.user===null){
            this.events.notify(UserEvent.AUTH);
            console.error("Неудачная авторизация");
        } else {
            this.errorMsg = null;
            this.events.notify(UserEvent.AUTH);
            this.events.notify(UserEvent.USER_LOGIN);
        }
    }

    /**
     * Обновление данных пользователя
     * @async
     */
    async updateUser(newUserData: { [index: string]: string }) {
        this.user!.Password = newUserData.Password || this.user!.Password;
        console.log(this.user)
        //this.events.notify(UserEvent.USER_UPDATE);
    }

    async createUser(user: User) {
        console.log("register: "+user)
        try {
            await Api.createUser(user);
            this.errorMsg = null;
        } catch (e: any) {
            console.log("bgfuhnjk")
            this.errorMsg = apiConfig.api.signup.failure[e.status];
            this.events.notify(UserEvent.USER_REG); // Грязный хак
            throw e;
        }
        this.events.notify(UserEvent.USER_REG);
    }

    /**
     * Авторизация по имени пользователя и паролю
     * @async
     * @param username - имя пользователя
     * @param password - пароль
     */
    async login(username: string, password: string) {
        console.log(username,password)
        console.log("login")
        this.user={Username:username,Password:password,Email:"123@mail.ru",Icon:"./"}
        this.errorMsg = null;
        console.log(this.user)
        this.events.notify(UserEvent.USER_LOGIN);
    }

    /**
     * Завершение сессии
     * @async
     */
    async logout() {
        try {
            await Api.logoutUser();
            this.user = null;
            this.errorMsg = null;
        } catch (e: any) {
            this.errorMsg = apiConfig.api.logout.failure[e.status];
            console.error("Неудачный логаут");
            console.error(e);
        }
        this.events.notify(UserEvent.USER_LOGOUT);
    }
}
