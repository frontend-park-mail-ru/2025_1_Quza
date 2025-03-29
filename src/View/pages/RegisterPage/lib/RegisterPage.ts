import MainTemplate from "../ui/RegisterView.hbs";
import "../ui/RegisterView.scss";
import { Page } from "../../..//types.d";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";
import { validateEmail, validatePassword, validatePasswordConfirm } from "../../../../modules/validations";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { Router } from "../../../app/Router";
export class RegisterPage extends Page implements Listenable<UIEvent> {
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
    private passwordConfirmMessageBox: HTMLElement;
    private passwordConfirmInput: HTMLInputElement;
    private showButton: HTMLElement;
    private showButton1: HTMLElement;
    private toLogin: HTMLElement;

    private form: HTMLFormElement;
    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(MainTemplate(), "#register_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.emailMessageBox = <HTMLElement>(
            this.element.querySelector("#errors-container1")
        );
        this.toLogin = <HTMLElement>(
            this.element.querySelector("#toLogin")
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
        this.passwordConfirmMessageBox = <HTMLElement>(
            this.element.querySelector("#errors-container3")
        );
        this.showButton = <HTMLElement>(
            this.element.querySelector(".show-password")
        );
        this.showButton1 = <HTMLElement>(
            this.element.querySelector(".show-password1")
        );
        this.passwordConfirmInput = <HTMLInputElement>(
            this.element.querySelector("#password2")
        );

        this.form = <HTMLFormElement>(
            this.element.querySelector("#register-form")
        );
        this.authButton = <HTMLElement>(
            this.element.querySelector(".submit-btn")
        );
        this.form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            console.log("form submit")
            const emailValidation = validateEmail(this.emailInput.value.trim());
            const passwordValidation = validatePassword(
                this.passwordInput.value.trim(),
            );
            const passwordConfirmValidation = validatePasswordConfirm(
                this.passwordInput.value.trim(),
                this.passwordConfirmInput.value.trim(),
            );

            if (
                !emailValidation &&
                !passwordValidation &&
                !passwordConfirmValidation
            ) {
                console.log("sucess")
                controller.handleEvent({
                                type: VIEW_EVENT_TYPE.LOGIN,
                                data: {
                                    username: this.emailInput.value.trim(),
                                    password: this.passwordInput.value.trim(),
                                },
                            });
            } else {
                this.emailMessageBox.innerText = emailValidation;
                this.passwordMessageBox.innerText = passwordValidation;
                this.passwordConfirmMessageBox.innerText = passwordConfirmValidation;
            }
        });

        this.authButton.addEventListener("click", () => {
            console.log("click")
        });
        this.toLogin.addEventListener("click", () => {
            console.log("click to login")
            this.events.notify({ type: UIEventType.TO_LOGIN_CLICK });
        });
        this.showButton.addEventListener("click", () => {
            if (this.passwordInput.type==="password"){
                this.passwordInput.type="text"
            } else {
                this.passwordInput.type="password"
            }
        });
        this.showButton1.addEventListener("click", () => {
            if (this.passwordConfirmInput.type==="password"){
                this.passwordConfirmInput.type="text"
            } else {
                this.passwordConfirmInput.type="password"
            }
        });
    
    }

    load() {
    }
}
