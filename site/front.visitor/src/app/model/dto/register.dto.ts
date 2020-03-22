import { User } from '../orm/user.model';

export interface IRegisterDTO {
    readonly user: User;
    readonly code: string;
}
