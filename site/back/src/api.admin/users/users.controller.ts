import { Controller, Param, Post, Body, Delete, UseGuards, Get } from "@nestjs/common";

import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";
import { GetchunkDTO } from "../../model/dto/getchunk.dto";
import { IAnswer } from "../../model/answer.interface";
import { IUser } from "../../model/orm/interfaces/user.interface";
import { UserCreateDTO } from "./dto/user.create.dto";
import { UserUpdateDTO } from "./dto/user.update.dto";
import { GetallDTO } from "../../model/dto/getall.dto";

@Controller('api/admin/users')
export class UsersController {
    constructor (private usersService: UsersService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<IUser[]>> {
        return this.usersService.all(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<IUser[]>> {
        return this.usersService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<IUser>> {
        return this.usersService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.usersService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.usersService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: UserCreateDTO): Promise<IAnswer<void>> {
        return this.usersService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: UserUpdateDTO): Promise<IAnswer<void>> {
        return this.usersService.update(dto);
    }
}
