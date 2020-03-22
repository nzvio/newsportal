import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { UserSchema } from "../../model/orm/schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { jwtConstants } from "../auth/auth.constants";
import { UsercodeSchema } from "../../model/orm/schemas/usercode.schema";
import { SettingSchema } from "../../model/orm/schemas/setting.schema";
import { LangSchema } from "../../model/orm/schemas/lang.schema";
import { UsergroupSchema } from "../../model/orm/schemas/usergroup.schema";

@Module({
    imports: [
        JwtModule.register(jwtConstants),
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},            
            {name: 'Usercode', schema: UsercodeSchema},            
            {name: 'Usergroup', schema: UsergroupSchema},            
            {name: 'Setting', schema: SettingSchema},
            {name: 'Lang', schema: LangSchema},
        ]),        
    ],
    controllers: [UsersController],
    providers: [UsersService], 
    exports: [UsersService],
})
export class UsersModule {}
