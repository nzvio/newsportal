import { IUser } from "./orm/interfaces/user.interface";

export interface IAuthData {
    readonly user: IUser;
    readonly token: string;    
}