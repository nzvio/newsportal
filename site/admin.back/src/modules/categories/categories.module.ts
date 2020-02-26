import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { CategorySchema } from "./schemas/category.schema";
import { jwtConstants } from "../auth/auth.constants";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Category', schema: CategorySchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService],    
})
export class CategoriesModule {}
