import { Controller, Get, Param } from "@nestjs/common";

import { UsersService } from "./users.service";
import { IAnswer } from "../../model/answer.interface";
import { UserDTO } from "./dto/user.dto";

@Controller('api/visitor/users')
export class UsersController {
    constructor (private usersService: UsersService) {}    

    // get one
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<UserDTO>> {
        return this.usersService.one(_id);
    }
}
