import { IUser } from "../../../model/orm/interfaces/user.interface";

export interface IAuthDataDTO {
    readonly user: IUser;
    readonly token: string;    
}