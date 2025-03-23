enum ROUTES {
    signup = "/signup",
    login = "/login",
    default = "/",
    profile = "/me",
    register = "/register",
    profile1="/profile1"
}
export { ROUTES };

export const enum UIEventType {
    NAVBAR_LOGO_CLICK = "NAVBAR_LOGO_CLICK",
    TO_LOGIN_CLICK = "TO_LOGIN_CLICK",
    TO_REG_CLICK = "TO_REG_CLICK",
    NAVBAR_SIGNIN_CLICK = "NAVBAR_SIGNIN_CLICK",
    NAVBAR_EXIT_CLICK = "NAVBAR_EXIT_CLICK",
    NAVBAR_NAME_CLICK = "NAVBAR_NAME_CLICK",
    LMODAL_SIGNUP_CLICK = "LMODAL_SIGNUP_CLICK",
    LMODAL_CLOSE_CLICK = "LMODAL_CLOSE_CLICK",
    LMODAL_AUTH_CLICK = "LMODAL_AUTH_CLICK",
    LMODAL_BACK_CLICK = "LMODAL_BACK_CLICK",
    LMODAL_NEXT_CLICK = "LMODAL_NEXT_CLICK",
    LMODAL_REG_CLICK = "LMODAL_REG_CLICK",
}

export type UIEvent = {
    type: UIEventType;
    data?: unknown;
};
