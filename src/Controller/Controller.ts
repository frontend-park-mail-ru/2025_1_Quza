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
                const data = event.data as { username: string; password: string };
                await model.userModel.login(
                    data.username,
                    data.password,
                );
                break;
            case VIEW_EVENT_TYPE.AUTH:
                await model.userModel.auth();
                break;
            case VIEW_EVENT_TYPE.USER_UPDATE:
                await model.userModel.updateUser(
                    (
                        event.data as {
                            userFields: { [index: string]: string };
                        }
                    ).userFields,
                );
            case VIEW_EVENT_TYPE.LOGOUT:
                await model.userModel.logout();
                break;
            case VIEW_EVENT_TYPE.REGISTRATION:
                try {
                    const data = event.data as User;
                    await model.userModel.createUser(data);
                    model.userModel.login(
                        data.Username,
                        data.Password,
                    );
                } catch (e) {
                    console.error("Неудачная регистрация");
                    console.error(e);
                }
                break;
        }
    }
}
