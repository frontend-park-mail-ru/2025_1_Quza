import { UserModel } from "./UserModel";

export class Model {
    private userModel_: UserModel;

    constructor() {
        this.userModel_ = new UserModel();
    }
    get userModel() {
        return this.userModel_;
    }
}
