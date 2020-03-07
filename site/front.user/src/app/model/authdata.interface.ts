import { User } from './user.model';

export interface IAuthData {    
    token: string;    
    user: User;
}