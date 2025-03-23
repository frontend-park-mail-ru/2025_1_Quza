import MainTemplate from "../ui/LoginView.hbs";
import "../ui/LoginView.scss";
import { Page } from "../../..//types.d";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";
import { validateEmail, validatePassword, validatePasswordConfirm, validateUsername } from "../../../../modules/validations";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
export class LoginPage extends Page implements Listenable<UIEvent> {
    private authButton: HTMLElement;
    private closeButton: HTMLElement;
    private backButton: HTMLElement;

    private messageBox: HTMLElement;

    private emailMessageBox: HTMLElement;
    private emailInput: HTMLInputElement;
    private usernameMessageBox: HTMLElement;
    private usernameInput: HTMLInputElement;
    private passwordMessageBox: HTMLElement;
    private passwordInput: HTMLInputElement;
    private showButton: HTMLElement;
    private showButton1: HTMLElement;
    private toReg: HTMLElement;

    private form: HTMLFormElement;
    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(MainTemplate(), "#login_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.emailMessageBox = <HTMLElement>(
            this.element.querySelector("#errors-container1")
        );
        this.toReg = <HTMLElement>(
            this.element.querySelector("#toReg")
        );
        this.emailInput = <HTMLInputElement>(
            this.element.querySelector("#email")
        );
        this.passwordMessageBox = <HTMLElement>(
            this.element.querySelector("#errors-container2")
        );
        this.passwordInput = <HTMLInputElement>(
            this.element.querySelector("#password1")
        );
        this.showButton = <HTMLElement>(
            this.element.querySelector(".show-password")
        );

        this.form = <HTMLFormElement>(
            this.element.querySelector("#login-form")
        );
        this.authButton = <HTMLElement>(
            this.element.querySelector(".submit-btn")
        );
        this.toReg.addEventListener("click", () => {
            console.log("click to login")
            this.events.notify({ type: UIEventType.TO_REG_CLICK });
        });
        this.form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            console.log("form submit")
            const emailValidation = validateEmail(this.emailInput.value.trim());
            const passwordValidation = validatePassword(
                this.passwordInput.value.trim(),
            );

            if (
                !emailValidation &&
                !passwordValidation
            ) {
                console.log("sucess")
                controller.handleEvent({
                                type: VIEW_EVENT_TYPE.LOGIN,
                                data: {
                                    username: this.emailInput.value.trim(),
                                    password: this.passwordInput.value.trim(),
                                },
                            });
                            this.events.notify({ type: UIEventType.NAVBAR_NAME_CLICK });
            } else {
                this.emailMessageBox.innerText = emailValidation;
                this.passwordMessageBox.innerText = passwordValidation;
            }
        });

        this.authButton.addEventListener("click", () => {
            console.log("click")
        });
        this.showButton.addEventListener("click", () => {
            if (this.passwordInput.type==="password"){
                this.passwordInput.type="text"
            } else {
                this.passwordInput.type="password"
            }
        });
    }

    update(event?: UIEvent) {
        this.events_.notify(event);
    }

    load() {
    }
}
