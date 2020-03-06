import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [        
        JwtModule.register(jwtConstants),
    ],    
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}
