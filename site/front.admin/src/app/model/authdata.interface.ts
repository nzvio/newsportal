import { User } from './orm/user.model';

export interface IAuthData {    
    token: string;    
    user: User;
}