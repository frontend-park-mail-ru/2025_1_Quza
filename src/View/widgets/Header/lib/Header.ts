import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { UserEvent } from "../../../../Model/UserModel";
import { UIEvent, UIEventType } from "../../../../config";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { IWidget } from "../../../types";
import headerTemplate from "../ui/Header.hbs";
import "../ui/Header.scss";

export class Header extends IWidget implements Listenable<UIEvent> {
    private userNameElement: HTMLElement;
    private signInButton: HTMLElement;

    private events_: EventDispatcher<UIEvent>;
    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }

    constructor() {
        super(headerTemplate(), ".header");
        this.events_ = new EventDispatcher<UIEvent>();

        model.userModel.events.subscribe(this.update.bind(this));

        this.userNameElement = <HTMLElement>(
            this.element.querySelector("#name-container")
        );
        this.signInButton = <HTMLElement>(
            this.element.querySelector("#signin-button")
        );

        this.bindEvents();
        this.setNonAuthUser();
    }

    private bindEvents() {
        this.element.querySelector("#logo")!.addEventListener("click", () => {
            this.events.notify({ type: UIEventType.NAVBAR_LOGO_CLICK });
        });
        this.element
            .querySelector("#signin-button")!
            .addEventListener("click", () => {
                this.events.notify({ type: UIEventType.NAVBAR_SIGNIN_CLICK });
            });
        this.element
            .querySelector("#exit-button")!
            .addEventListener("click", () => {
                this.events.notify({ type: UIEventType.NAVBAR_EXIT_CLICK });
                controller.handleEvent({
                    type: VIEW_EVENT_TYPE.LOGOUT,
                    data: null,
                });
            });
    }

    update(event?: UserEvent) {
        switch (event) {
            case UserEvent.USER_LOGIN: {
                const user = model.userModel.getUser();
                if (user) {
                    this.setAuthUser(user.Username);
                } else {
                    this.setNonAuthUser();
                }
                break;
            }
            case UserEvent.USER_LOGOUT: {
                const user = model.userModel.getUser();
                if (!user) {
                    this.setNonAuthUser();
                }
                break;
            }
            default:
                break;
        }
    }

    private setAuthUser(username: string) {
        this.userNameElement.firstElementChild!.innerHTML = username;
        this.element.appendChild(this.userNameElement);
        if (this.signInButton.parentNode) {
            this.element.removeChild(this.signInButton);
        }
    }

    private setNonAuthUser() {
        this.element.appendChild(this.signInButton);
        if (this.userNameElement.parentNode) {
            this.element.removeChild(this.userNameElement);
        }
    }

    load() {
        const user = model.userModel.getUser();
        if (user) this.setAuthUser(user!.Username);
    }
}
