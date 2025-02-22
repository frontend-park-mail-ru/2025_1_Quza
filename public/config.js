const mainPage = {
    id: "main-page",
    href: "/",
    needAuth: true,
    home: {
        id: "home",
        linkToLogin: {
            text: "Попробовать"
        }
    }
}

const header = {
    name: "Colab",
    logo: {
        href: "/",
        text: "Colab"
    },
    avatarLink: {
        href: "/profile"
    },
    avatar: {
        id: "user-avatar"
    },
    menu: {
        home: {
            href: "/",
            text: "Главная"
        },
        main: {
            href: "/",
            text: "Программы"
        },
        auth: {
            id: "link-to-login",
            href: "/login",
            text: "Вход"
        },
        register: {
            href: "/register",
            text: "Регистрация"
        }
    }
}

const footer = {
    id: "footer"
}

const wrapper = {
    id: "wrapper"
}

const profilePage = {
    href: "/profile",
    id: "profile-page",
    logoutBtn: {
        text: "Выйти"
    }
}

const loginPage = {
    id: "login-page",
    href: "/login",
    form: {
        id: "login-form",
        inputs: {
            login: {
                id: "login",
                type: 'text',
                placeholder: 'Введите логин'
            },
            password: {
                id: "password",
                type: "password",
                placeholder: "Придумайте пароль"
            }
        },
        links: {
            registerPage: {
                href: "/register",
                text: "Ещё не зарегистрированы?",
            }
        },
        buttons: {
            submitBtn: {
                text: "Войти"
            }
        }
    }
}

const registerPage = {
    href: "/register",
    id: "register-page",
    form: {
        id: "register-form",
        inputs: {
            login: {
                type: "text",
                placeholder: "Введите логин"
            },
            password: {
                type: "password",
                placeholder: "Введите пароль"
            },
            repeatPassword: {
                type: "password",
                placeholder: "Повторите пароль"
            }
        },
        links: {
            loginPage: {
                href: "/login",
                text: "Уже есть аккаунт?",
            }
        },
        buttons: {
            submitBtn: {
                text: "Зарегистрироваться"
            }
        }
    },
}

const notFoundPage = {
    href: "/404",
    id: "not-found",
    link: {
        href: "/",
        text: "Вернуться на главную"
    }
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
    profilePage: profilePage,
    notFoundPage: notFoundPage,
    header: header,
    codes: codes,
    codeEditor: codeEditor,
    code: code,
    avatar: avatar,
    wrapper: wrapper,
    footer: footer
};
