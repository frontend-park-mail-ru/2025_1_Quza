import type { ApiConfig } from "./api";

export enum REQUEST_METHOD {
    POST = "POST",
    GET = "GET",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export const apiConfig: ApiConfig = {
    backend: "http://localhost:8080/api",
    api: {
        auth: {
            url: "/auth",
            params: () => {
                return {
                    method: REQUEST_METHOD.GET,
                    credentials: "include",
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                401: "Не авторизован",
                500: "Ошибка сервера",
            },
            restrictions: {
                "content-type": "application/json",
            },
        },
        login: {
            url: "/login",
            params: (body) => {
                return {
                    method: REQUEST_METHOD.POST,
                    body: body,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                401: "Неверный логин или пароль",
                500: "Ошибка сервера",
            },
            restrictions: {
                "content-type": "application/json",
            },
        },
        logout: {
            url: "/logout",
            params: () => {
                return {
                    method: REQUEST_METHOD.DELETE,
                    credentials: "include",
                };
            },
            success: {
                200: "OK",
            },
            failure: {
                401: "Не авторизован",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
        csrf: {
            url: "/csrf",
            params: () => {
                return {
                    method: REQUEST_METHOD.POST,
                    credentials: "include",
                };
            },
            success: {
                201: "OK",
            },
            failure: {
                401: "Не авторизован",
                500: "Ошибка сервера",
            },
            restrictions: {},
        },
    },
};
