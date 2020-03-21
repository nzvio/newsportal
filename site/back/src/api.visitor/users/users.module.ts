import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { UserSchema } from "../../model/orm/schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        JwtModule.register(jwtConstants),
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},            
        ]),        
    ],
    controllers: [UsersController],
    providers: [UsersService], 
    exports: [UsersService],
})
export class UsersModule {}
