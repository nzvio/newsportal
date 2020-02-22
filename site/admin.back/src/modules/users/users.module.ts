import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/auth.constants";
import { UserSchema } from "./schemas/user.schema";
import { UsersService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        JwtModule.register(jwtConstants),
    ],
    exports: [UsersService],
    controllers: [],
    providers: [UsersService],
})
export class UsersModule {}
