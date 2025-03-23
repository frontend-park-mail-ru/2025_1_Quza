import MainTemplate from "../ui/ProfileView.hbs";
import "../ui/ProfileView.scss";
import { Page } from "../../..//types.d";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent, UIEventType } from "../../../../config";
import { validatePassword, validatePasswordConfirm } from "../../../../modules/validations";
import { VIEW_EVENT_TYPE } from "../../../../Controller/Controller";
import { Header } from "../../../widgets/Header";
export class ProfilePage1 extends Page implements Listenable<UIEvent> {
        private authButton: HTMLElement;
        private emailInput: HTMLInputElement;
        private usernameMessageBox: HTMLElement;
        private bankInput: HTMLInputElement;
        private passwordMessageBox: HTMLElement;
        private passwordInput: HTMLInputElement;
        private passwordConfirmMessageBox: HTMLElement;
        private passwordConfirmInput: HTMLInputElement;
        private showButton: HTMLElement;
        private showButton1: HTMLElement;
        private downloadPhoto: HTMLInputElement;
        private toLogin: HTMLElement;
    
        private form: HTMLFormElement;

    private header: Header;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(MainTemplate(), "#profile_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.header = new Header();

        this.form = <HTMLFormElement>(
            this.element.querySelector("#profile-form")
        );
        this.bankInput = <HTMLInputElement>(
            this.element.querySelector("#bank")
        );
        this.passwordInput = <HTMLInputElement>(
            this.element.querySelector("#profile-password1")
        );
        this.passwordConfirmInput = <HTMLInputElement>(
            this.element.querySelector("#profile-password2")
        );
        this.showButton = <HTMLElement>(
            this.element.querySelector(".profile-show-password")
        );
        this.showButton1 = <HTMLElement>(
            this.element.querySelector(".profile-show-password1")
        );
        this.passwordMessageBox = <HTMLElement>(
            this.element.querySelector("#profile-errors-container1")
        );
        this.passwordConfirmMessageBox = <HTMLElement>(
            this.element.querySelector("#profile-errors-container2")
        );
        this.authButton = <HTMLElement>(
            this.element.querySelector(".submit-btn")
        );
        this.downloadPhoto=<HTMLInputElement>(
            this.element.querySelector("#file-input")
        );
        

        this.element.appendChild(this.header.element);
        this.downloadPhoto.addEventListener('change', function(event) {
            console.log(event.target!.files[0])
            });
                this.form.addEventListener("submit", (event: Event) => {
                    event.preventDefault();
                    console.log("form submit")
                                const passwordValidation = validatePassword(
                                    this.passwordInput.value.trim(),
                                );
                                const passwordConfirmValidation = validatePasswordConfirm(
                                    this.passwordInput.value.trim(),
                                    this.passwordConfirmInput.value.trim(),
                                );
                    
                                if (
                                    !passwordValidation &&
                                    !passwordConfirmValidation
                                ) {
                                    console.log("sucess")
                                    controller.handleEvent({
                                                    type: VIEW_EVENT_TYPE.USER_UPDATE,
                                                    data: {
                                                        userFields: {
                                                            Password: this.passwordInput.value.trim()
                                                        },
                                                    },
                                                });
                                } else {
                                    this.passwordMessageBox.innerText = passwordValidation;
                                    this.passwordConfirmMessageBox.innerText = passwordConfirmValidation;
                                }
                });
        
                this.authButton.addEventListener("click", () => {
                    console.log("click edit data")
                });
                this.downloadPhoto.addEventListener("click", () => {
                    console.log("click download photo")
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

    update(event?: UIEvent) {
        switch (event!.type) {
            case UIEventType.NAVBAR_SIGNIN_CLICK:
                //this.login.open();
                break;
            default:
                break;
        }
        this.events_.notify(event);
    }

    load() {
        this.header.load();
    }
}
