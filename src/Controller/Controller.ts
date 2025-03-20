import { User } from "../Model/UserModel";

export enum VIEW_EVENT_TYPE {
    LOGIN = "LOGIN",
    REGISTRATION = "REGISTRATION",
    LOGOUT = "LOGOUT",
    AUTH = "AUTH",
    USER_UPDATE = "USER_UPDATE",
}

export type ViewEvent = {
    type: VIEW_EVENT_TYPE;
    data: unknown;
};

export class Controller {
    async handleEvent(event: ViewEvent) {
        switch (event.type) {
            case VIEW_EVENT_TYPE.LOGIN:
                await model.userModel.login(
                    (<{ username: string; password: string }>event.data)
                        .username,
                    (<{ username: string; password: string }>event.data)
                        .password,
                );
                break;
            case VIEW_EVENT_TYPE.AUTH:
                await model.userModel.auth();
                break;
            case VIEW_EVENT_TYPE.LOGOUT:
                await model.userModel.logout();
                break;
            case VIEW_EVENT_TYPE.REGISTRATION:
                try {
                    await model.userModel.createUser(event.data as User);
                    model.userModel.login(
                        (<User>event.data).Username,
                        (<User>event.data).Password,
                    );
                } catch (e) {
                    console.error("Неудачная регистрация");
                    console.error(e);
                }
                break;
        }
    }
}
