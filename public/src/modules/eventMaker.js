class EventMaker{
    #eventsMap;

    constructor() {
        this.#eventsMap = new Map();
    }

    /**
     * Подписывает функцию обратного вызова (callback) на определенное событие.
     *
     * @param {string} event - Название события, на которое нужно подписаться.
     * @param {function} callback - Функция, которая будет вызвана при наступлении события.
     */
    subscribe(event, callback){
        if (event in this.#eventsMap){
            this.#eventsMap[event].add(callback);
            return;
        }
        this.#eventsMap[event] = new Set([callback]);
    }

    /**
     * Отписывает функцию обратного вызова от определенного события.  Удаляет функцию из списка подписчиков.
     *
     * @param {string} event - Название события, от которого нужно отписаться.
     * @param {function} callback - Функция, которую нужно отписать.
     */
    unsubscribe(event, callback){
        this.#eventsMap[event].delete(callback);
    }

    /**
     * Уведомляет всех подписчиков об определенном событии, передавая им аргументы.
     *
     * @param {string} event - Название события, о котором нужно уведомить подписчиков.
     * @param {...any} args - Аргументы, которые будут переданы функциям обратного вызова.
     */
    notify(event, ...args){
        if(!(event in this.#eventsMap)){
            return;
        }

        this.#eventsMap[event].forEach((listener) => {
            listener.apply(this, args);
        });
    }
}

export const AppEventMaker = new EventMaker();