const homePage = {
    id: "home",
    href: "/",
    linkToLoginPage: {
        text: "Попробовать"
    }
}

const codesPage1 = {
    id: "codes-page1",
    href: "/codes1",
    needAuth: true,
    searchBar: {
        id: "codes-search-bar",
    },
    codeEditor: {
        id: "code-editor",
        closeBtn: {
            id: "close-editor-btn",
            src: "/src/assets/close.png"
        }
    }
}

const codesPage = {
    id: "codes-page",
    href: "/codes",
    needAuth: true,
    searchBar: {
        id: "codes-search-bar",
    },
    codeEditor: {
        id: "code-editor",
        closeBtn: {
            id: "close-editor-btn",
            src: "/src/assets/close.png"
        }
    }
}

const header = {
    name: "YouCode",
    logo: {
        id: "logo",
        img: {
            id: "logo-icon",
            src: "/src/assets/logo.png"
        }
    },
    settings: {
        id: "settings-wrapper",
        panel: {
            id: "popup-content",
            avatar: {
                id: "user-avatar"
            },
            username: {
                class: "username"
            },
            logoutBtn: {
                id: "logout-btn",
                text: "Выйти"
            }
        }
    },
    menu: {
        auth: {
            id: "link-to-login",
            href: "/auth",
            text: "Вход"
        }
    }
}

const footer = {
    id: "footer"
}

const wrapper = {
    id: "wrapper"
}

const authPage = {
    id: "auth-page",
    href: "/auth",
    needAuth: false,
    forms: {
        login: {
            id: "login-form",
            inputs: {
                login: {
                    type: 'text',
                    icon: "/src/assets/user.png",
                    placeholder: 'Введите логин'
                },
                password: {
                    type: "password",
                    icon: "/src/assets/password.png",
                    placeholder: "Введите пароль"
                }
            },
            buttons: {
                submitBtn: {
                    text: "Войти"
                }
            }
        },
        register: {
            id: "register-form",
            inputs: {
                login: {
                    type: "text",
                    icon: "/src/assets/user.png",
                    placeholder: "Придумайте логин"
                },
                password: {
                    type: "password",
                    icon: "/src/assets/password.png",
                    placeholder: "Придумайте пароль"
                },
                repeatPassword: {
                    type: "password",
                    icon: "/src/assets/password.png",
                    placeholder: "Повторите пароль"
                }
            },
            buttons: {
                submitBtn: {
                    text: "Зарегистрироваться"
                }
            }
        }
    },
    links: {
        linkToLogin: {
            text: "Войти"
        },
        linkToRegister: {
            text: "Регистрация"
        }
    }
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

const code = {

}

const avatar = {

}

export const config = {
    homePage: homePage,
    codesPage1: codesPage1,
    codesPage: codesPage,
    authPage: authPage,
    notFoundPage: notFoundPage,
    header: header,
    codes: codes,
    code: code,
    avatar: avatar,
    wrapper: wrapper,
    footer: footer
};
