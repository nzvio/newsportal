import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { ParseerrorSchema } from "../../schemas/parseerror.schema";
import { ParseerrorsService } from "./parseerrors.service";
import { ParseerrorsController } from "./parseerrors.controller";
import { jwtConstants } from "../auth/auth.constants";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Parseerror', schema: ParseerrorSchema}]),        
        JwtModule.register(jwtConstants),
    ],
    controllers: [ParseerrorsController],
    providers: [ParseerrorsService],    
})
export class ParseerrorsModule {}
