import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

import { APIService } from "../../services/_api.service";
import { UsersService } from "../users/users.service";
import { LoginDTO } from "./dto/login.dto";
import { IAnswer } from "../../model/answer.interface";
import { UserDTO } from "../users/dto/user.dto";
import { IAuthDataDTO } from "./dto/authdata.dto";

@Injectable()
export class AuthService extends APIService {
    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
        super();
    }

    public async login(dto: LoginDTO): Promise<IAnswer<IAuthDataDTO>> {
        try {            
            let user: UserDTO | null = await this.validateUser(dto.email, dto.password);

            if (user) {
                user.password = undefined;
                user.active = undefined;
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

    private async validateUser(email: string, password: string): Promise<UserDTO> {
        let user: UserDTO = await this.usersService.oneByEmail(email);        

        if (user && user.active && await this.compare(password, user.password)) {            
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
