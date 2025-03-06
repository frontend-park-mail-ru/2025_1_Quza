import {Toast} from "../components/toast/toast.js";
import {AppEventMaker} from "./eventMaker.js";

/**
 * Класс, представляющий коллекцию тостов.
 */
class Toasts {
    #parent;

    #toasts;

    /**
     * Создает экземпляр Toasts.
     */
    constructor() {
        this.#toasts = [];
    }

    /**
     * Получает элемент-обертку для тостов.
     * @returns {HTMLElement} Элемент-обертка для тостов.
     */
    get self() {
        return document.querySelector(".toasts-wrapper");
    }

    /**
     * Отображает тост с указанным заголовком, сообщением и типом.
     * @private
     * @param {string} title - Заголовок тоста.
     * @param {string} message - Сообщение тоста.
     * @param {string} type - Тип тоста (успех или ошибка).
     */
    #show(title, message, type) {
        const toast = new Toast(this.#parent, title, message, type);
        toast.render();

        this.#toasts.forEach(toast => {
            toast.self.style.top = `${toast.self.offsetTop + 100}px`;
        });

        this.#toasts.push(toast);
        if (this.#toasts.length > 3) {
            const hiddenToast = this.#toasts[0];
            hiddenToast.close();
            this.#toasts = this.#toasts.filter(toast => toast.id !== hiddenToast.id);
        }
    }

    /**
     * Отображает тост успешного выполнения.
     * @param {string} title - Заголовок тоста успешного выполнения.
     * @param {string} message - Сообщение тоста успешного выполнения.
     */
    success(title, message) {
        this.#show(title, message, TOAST_TYPE.SUCCESS);
    }

    /**
     * Отображает тост ошибки.
     * @param {string} title - Заголовок тоста ошибки.
     * @param {string} message - Сообщение тоста ошибки.
     */
    error(title, message) {
        this.#show(title, message, TOAST_TYPE.ERROR);
    }

    /**
     * Инициализирует экземпляр Toasts с родительским элементом и подписывается на события.
     * @param {HTMLElement} parent - Родительский элемент для тостов.
     */
    init (parent) {
        this.#parent = parent;

        AppEventMaker.subscribe(ToastEvents.TOAST_CLOSE, (id) => {
            let flag = false;
            this.#toasts.forEach(toast => {
                if (toast.id === id) {
                    flag = true;
                }

                if (!flag) {
                    setTimeout(() => {
                        toast.self.style.top = `${toast.self.offsetTop - 100}px`;
                    }, 250);
                }
            });

            this.#toasts = this.#toasts.filter(toast => toast.id !== id);
        });
    }
}

/**
 * События тостов.
 * @enum {string}
 */
export const ToastEvents = {
    TOAST_CLOSE: "TOAST_CLOSE"
};

/**
 * Типы тостов.
 * @enum {string}
 */
export const TOAST_TYPE = {
    SUCCESS: "success",
    ERROR: "error"
};

/**
 * Экземпляр класса Toasts.
 * @type {Toasts}
 */
export const toasts = new Toasts();