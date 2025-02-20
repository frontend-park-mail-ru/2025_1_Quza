const button = {
    "text": "toast",
    "id": "hehe123"
}

const mainPage = {
    button: button
}

const header = {
    name: "Colab",
    menu: [
        {
            href: "",
            text: "Главная",
            needAuth: false
        },
        {
            href: "main",
            text: "Мои проекты",
            needAuth: true
        },
        {
            href: "login",
            text: "Вход",
            needAuth: false
        },
        {
            href: "register",
            text: "Регистрация",
            needAuth: false
        }
    ]
}

const loginPage = {

}

const registerPage = {

}

const codes = {

}

const codeEditor = {

}

const code = {

}

const avatar = {

}

export const config = {
    isAuthorized: false,
    mainPage: mainPage,
    loginPage: loginPage,
    registerPage: registerPage,
    header: header,
    codes: codes,
    codeEditor: codeEditor,
    code: code,
    avatar: avatar
};
