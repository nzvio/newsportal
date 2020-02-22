import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./auth.constants";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [
        UsersModule,        
        JwtModule.register(jwtConstants),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthGuard,        
    ],    
})
export class AuthModule {}
