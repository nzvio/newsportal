import { Controller, Post, Body } from "@nestjs/common";

import { CategoriesService } from "./categories.service";
import { GetallDTO } from "../../dto/getall.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { CategoryDTO } from "./dto/category.dto";

@Controller('api/visitor/categories')
export class CategoriesController {
    constructor (private categoriesService: CategoriesService) {}

    // get all
    @Post("all")
    public all(@Body() dto: GetallDTO): Promise<IAnswer<CategoryDTO[]>> {
        return this.categoriesService.all(dto);
    }
}
