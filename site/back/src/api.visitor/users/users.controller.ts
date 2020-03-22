import { Controller, Get, Param, UseGuards, Post, Body } from "@nestjs/common";

import { UsersService } from "./users.service";
import { IAnswer } from "../../model/answer.interface";
import { UserDTO } from "./dto/user.dto";
import { AuthGuard } from "../auth/auth.guard";
import { UserUpdateDTO } from "./dto/user.update.dto";
import { IPreregisterDTO } from "./dto/preregister.dto";
import { IRegisterDTO } from "./dto/register.dto";

@Controller('api/visitor/users')
export class UsersController {
    constructor (private usersService: UsersService) {}    

    // get one
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<UserDTO>> {
        return this.usersService.one(_id);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: UserUpdateDTO): Promise<IAnswer<void>> {
        return this.usersService.update(dto);
    }

    // check email and send code
    @Post("preregister")
    public preregister(@Body() dto: IPreregisterDTO): Promise<IAnswer<void>> {
        return this.usersService.preregister(dto);
    }

    // check code and regoster
    @Post("register")
    public register(@Body() dto: IRegisterDTO): Promise<IAnswer<void>> {
        return this.usersService.register(dto);
    }
}
