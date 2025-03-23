import { Router } from "./Router";
import { MainPage } from "../pages/MainPage/index";
import { ROUTES } from "../types.d";
import { Page } from "../types.d";
import { UIEvent, UIEventType } from "../../config";
import { UserEvent } from "../../Model/UserModel";
import { VIEW_EVENT_TYPE } from "../../Controller/Controller";

import favIconImg from "../../../public/main_icon.ico";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage1 } from "../pages/Profile1Page";

export class View {
    private root: HTMLElement;
    private mainPage: MainPage;
    private registerPage: RegisterPage;
    private loginPage: LoginPage;
    private profilePage1: ProfilePage1;
    private router_: Router;
    constructor() {
        this.root = <HTMLElement>document.querySelector("#root")!;
        const favicon = document.createElement("link");
        favicon.setAttribute("rel", "icon");
        favicon.setAttribute("href", favIconImg);
        favicon.setAttribute("type", "image/x-icon");
        document.querySelector("head")!.appendChild(favicon);

        model.userModel.events.subscribe(this.updateUserEvent.bind(this));

        this.mainPage = new MainPage();
        this.mainPage.events.subscribe(this.updateUIEvent.bind(this));

        this.registerPage = new RegisterPage();
        this.registerPage.events.subscribe(this.updateUIEvent.bind(this));

        this.profilePage1=new ProfilePage1()
        this.profilePage1.events.subscribe(this.updateUIEvent.bind(this));

        this.loginPage = new LoginPage();
        this.loginPage.events.subscribe(this.updateUIEvent.bind(this));

        const routes = new Map<string, Page>([
            [ROUTES.register, this.registerPage],
            [ROUTES.login, this.loginPage],
            [ROUTES.profile1, this.profilePage1],
        ]);

        this.router_ = new Router(routes, this.root);

        window.onpopstate = (event: Event) => {
            event.preventDefault();
            this.router_.route(
                window.location.pathname,
                window.location.search,
            );
        };

        controller.handleEvent({
            type: VIEW_EVENT_TYPE.AUTH,
            data: null,
        });
    }

    updateUIEvent(event?: UIEvent) {
        switch (event!.type) {
            case UIEventType.NAVBAR_LOGO_CLICK:
                this.router_.redirect(ROUTES.main);
                break;
            case UIEventType.TO_LOGIN_CLICK:
                this.router_.redirect(ROUTES.login);
                break;
            case UIEventType.TO_REG_CLICK:
                this.router_.redirect(ROUTES.register);
                break;
            case UIEventType.NAVBAR_NAME_CLICK:
                this.router_.redirect(ROUTES.profile1);
                break
            default:
                break;
        }
    }

    updateUserEvent(event?: UserEvent) {
        switch (event) {
            case UserEvent.AUTH:
                if (
                    !model.userModel.getUser() &&
                    (window.location.pathname == ROUTES.profile)
                ) {
                    this.router_.redirect(ROUTES.main);
                    alert("Нужно залогиниться");
                } else {
                    this.router_.route(
                        window.location.pathname,
                        window.location.search,
                    );
                }
                break;
            case UserEvent.USER_LOGOUT:
                if (
                    !model.userModel.getUser() &&
                    (window.location.pathname == ROUTES.profile)
                ) {
                    this.router_.redirect(ROUTES.main);
                }
                break;
            default:
                break;
        }
    }
}
