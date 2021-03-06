import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

import { APIService } from "../../common.services/_api.service";
import { UsersService } from "../users/users.service";
import { UsergroupsService } from "../usergroups/usergroups.service";
import { LoginDTO } from "./dto/login.dto";
import { IAnswer } from "../../model/answer.interface";
import { IUser } from "../../model/orm/interfaces/user.interface";
import { IUsergroup } from "../../model/orm/interfaces/usergroup.interface";
import { IAuthDataDTO } from "./dto/authdata.dto";

@Injectable()
export class AuthService extends APIService {
    constructor (
        private readonly usersService: UsersService,
        private readonly usergroupsService: UsergroupsService,
        private readonly jwtService: JwtService,
    ) {
        super();
    }

    public async login(dto: LoginDTO): Promise<IAnswer<IAuthDataDTO>> {
        try {            
            let user: IUser | null = await this.validateUser(dto.email, dto.password);

            if (user) {
                const payload: Object = {username: user.email, sub: user._id};
                return {statusCode: 200, data: {token: this.jwtService.sign(payload), user}};
            } else {
                return {statusCode: 401, error: "Unauthorized"};
            }
        } catch (err) {
            let errTxt: string = `Error in AuthService.login: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    private async validateUser(email: string, password: string): Promise<IUser> {
        let user: IUser = await this.usersService.oneByEmail(email);
        let usergroup: IUsergroup = await this.usergroupsService.oneByName("admin");              

        if (user && usergroup && user.usergroup == usergroup._id && user.active && await this.compare(password, user.password)) {
            user.password = undefined;
            return user;
        } else {
            return null;
        }
    }    

    private compare(password, hash): Promise<boolean> {
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
