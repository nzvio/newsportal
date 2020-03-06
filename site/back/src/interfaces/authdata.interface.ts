import { IUser } from "./model/user.interface";

export interface IAuthData {
    readonly user: IUser;
    readonly token: string;    
}