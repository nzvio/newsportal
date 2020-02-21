import { Injectable } from "@angular/core";
import { User } from '../model/user.model';

@Injectable()
export class AuthService {
    public user: User | null = null;
}
