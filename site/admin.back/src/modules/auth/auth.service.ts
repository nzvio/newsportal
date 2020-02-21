import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { APIService } from "../api.service";
import { UsersService } from "../users/users.service";
import { IUser } from "../users/interfaces/user.interface";

@Injectable()
export class AuthService extends APIService {
    constructor (private readonly usersService: UsersService) {
        super();
    }

    public async validateUser(email: string, password: string): Promise<IUser> {
        try {
            let user: IUser = await this.usersService.oneByEmail(email);

            if (user && await this.compare(password, user.password)) {
                user.password = null;
                return user;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
            return null;
        }        
    }

    public compare(password, hash): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }
}
