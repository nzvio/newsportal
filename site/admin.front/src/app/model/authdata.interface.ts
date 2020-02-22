import { User } from './user.model';

export interface AuthData {    
    token: string;
    expiration: number; // time in ms
    user: User;
}