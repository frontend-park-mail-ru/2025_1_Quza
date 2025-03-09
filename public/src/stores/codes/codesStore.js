import {AppEventMaker} from "../../modules/eventMaker.js";
import {CodesStoreEvents} from "./events.js";
import {CodeEvents} from "../../pages/codes/events.js";
import { router } from "../../modules/router.js";


const HOST = "http://localhost:8080";

/**
     * Хранилище всего, что связано с проектами
     */
class CodesStore {
    #selectedCodeData;
    #selectedCodeDOM;

    #codes;

    #query = "";
    #offset = 0;
    #count = 10;


    /**
     * Возвращает список проектов
     * @returns {any}
     */
    get codes() {
        return this.#codes;
    }

    /**     * Получение данных одной программы (MOCK)
     * @param code {HTMLElement}     */
    fetchCode(code) {
        const data = { 
            id: code.id, 
            title: "Mock Code",
            content: "This is mock code content.",
            data:["string1","string2","string3"],
            create_time: new Date().toISOString(),
            update_time: new Date().toISOString()
        };

        this.#selectedCodeDOM = code;
        this.#selectedCodeData = data;
        AppEventMaker.notify(CodeEvents.CODE_SELECTED, this._convertCodeData(data));
    }

    /**
     * Отключает стиль у кода
     */
    unselectCode() {
        this.#selectedCodeDOM?.classList.remove("selected");
    }

    /**
     * Инициализация всех проектов   
     * Запрос к серверу, сервер возвращает ответ и сохраняет в #codes   */
    init() {
            fetch(`${HOST}/file`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                this.#codes = data;
                AppEventMaker.notify(CodesStoreEvents.CODES_RECEIVED, data);
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    }
    

    /**
         * Выполняет создание block
         * @param credentials
         * @returns {Promise<void>}
         */
        async addblock(credentials) {
            try {
                await fetch(`${HOST}/file`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        projName: credentials.projName, 
                        data: credentials.data
                    })
                });
        
                console.log("add block успешен (нет возврата данных)");
                router.redirect("/" + credentials.projName);
            } catch (err) {
                console.error("Ошибка в addblock:", err);
            }
        }
    
        

    /**
     * Обнуляет оффсет когда пользователь поикдает страницу с его проектами
     */
    clean (){
        this.#offset = 0;
    }

    /**
     * Поиск проектов по коду (MOCK)     * @param query {string} поисковой запрос
     */
    //это понадобиться на каком-то РК, но не 1, поэтому TODO: спрятать перед РК1!!!
    searchCodes (query) {
        this.#query = query;
        this.#offset = 0;
        const codes = [ // MOCK
            { id: 3, title: `Mock Code 3 (${query})`, content: `Mock content 3 (matching ${query})`, create_time: new Date().toISOString(), update_time: new Date().toISOString() }
        ];
        this.#codes = codes.map(code => this._convertCodeData(code));
        console.log(codes)
        AppEventMaker.notify(CodesStoreEvents.CODES_RECEIVED, codes, true);
    }

    /**     * Подгрузка новых программ (MOCK)
     */
    loadCodes() {
        this.#offset += this.#count;
        const params = {
            title: this.#query,
            offset: this.#offset
        };
        const codes = [ // MOCK
            { id: 4 + this.#offset, title: `Mock Code ${4 + this.#offset}`, content: `Mock content ${4 + this.#offset} (loaded)`, create_time: new Date().toISOString(), update_time: new Date().toISOString() }
        ];
        const convertedCodes = codes.map(code => this._convertCodeData(code));
        this.#codes = this.#codes.concat(convertedCodes);
        AppEventMaker.notify(CodesStoreEvents.CODES_RECEIVED, convertedCodes);
        //});
    }
    /**
     * Converts raw code data into a format suitable for the component.
     * @param {object} codeData - Raw code data object.
     * @returns {object} - Transformed code data.
     */
    _convertCodeData(codeData) {
        const truncate = (str, len) => {
            if (str && str.length > len) {
                let new_str = str.substring(0, len + 1).trim();
                new_str = new_str.substring(0, new_str.lastIndexOf(" "));
                return new_str + "...";
            }
            return str;
        };

        return {
            id: codeData.id,
            title: codeData.title,
            content: truncate(codeData.content, 50),
            create_time: codeData.create_time,
            update_time: new Intl.DateTimeFormat("ru", {
                month: "short", day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hourCycle: "h23"
            }).format(new Date(codeData.update_time)).replace(",", "")
        };
    }
}

export const AppCodesStore = new CodesStore();