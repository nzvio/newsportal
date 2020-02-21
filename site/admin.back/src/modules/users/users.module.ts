import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserSchema } from "./schemas/user.schema";
import { UsersService } from "./users.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    exports: [UsersService],
    controllers: [],
    providers: [UsersService],
})
export class UsersModule {}
