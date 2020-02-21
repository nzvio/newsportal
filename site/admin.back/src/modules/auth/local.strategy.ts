import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "./auth.service";
import { IUser } from "../users/interfaces/user.interface";
import { IAnswer } from "src/interfaces/answer.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    // strict signature for parameters!
    // (username: string, password: string) => any
    async validate(username: string, password: string): Promise<IAnswer<IUser>> {
        const user: IUser = await this.authService.validateUser(username, password);
        return (user) ? {status: 200, data: user} : {status: 401, error: "Unathorized"};
    }
}
