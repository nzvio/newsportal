import { IUser } from "../../../model/orm/interfaces/user.interface";

export interface IRegisterDTO {
    readonly user: IUser;
    readonly code: string;
}
