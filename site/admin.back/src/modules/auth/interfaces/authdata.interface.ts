import { IUser } from "src/modules/users/interfaces/user.interface";

export interface IAuthData {
    readonly user: IUser;
    readonly token: string;    
}