import { Controller, UseGuards, Post, Body, Get, Param, Delete } from "@nestjs/common";

import { CategoriesService } from "./categories.service";
import { AuthGuard } from "../auth/auth.guard";
import { GetallDTO } from "../../dto/getall.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { ICategory } from "./interfaces/category.interface";
import { CategoryDTO } from "./dto/category.dto";
import { GetchunkDTO } from "../../dto/getchunk.dto";
import { CategoryCreateDTO } from "./dto/category.create.dto";
import { CategoryUpdateDTO } from "./dto/category.update.dto";

@Controller('api/admin/categories')
export class CategoriesController {
    constructor (private categoriesService: CategoriesService) {}

    // get all
    @UseGuards(AuthGuard)
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<CategoryDTO[]>> {
        return this.categoriesService.all(dto);
    }

    // get fragment
    @UseGuards(AuthGuard)
    @Post("chunk")
    public chunk(@Body() dto: GetchunkDTO): Promise<IAnswer<CategoryDTO[]>> {
        return this.categoriesService.chunk(dto);
    }

    // get one
    @UseGuards(AuthGuard)
    @Get("one/:_id")
    public one(@Param("_id") _id: string): Promise<IAnswer<ICategory>> {
        return this.categoriesService.one(_id);
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete("delete/:_id")
    public delete(@Param("_id") _id: string): Promise<IAnswer<void>> {
        return this.categoriesService.delete(_id);
    }

    // delete many
    @UseGuards(AuthGuard)
    @Delete("deletebulk")
    public deleteBulk(@Body() _ids: string[]): Promise<IAnswer<void>> {
        return this.categoriesService.deleteBulk(_ids);
    }

    // create
    @UseGuards(AuthGuard)
    @Post("create")
    public create(@Body() dto: CategoryCreateDTO): Promise<IAnswer<void>> {
        return this.categoriesService.create(dto);
    }

    // update
    @UseGuards(AuthGuard)
    @Post("update")
    public update(@Body() dto: CategoryUpdateDTO): Promise<IAnswer<void>> {
        return this.categoriesService.update(dto);
    }
}
