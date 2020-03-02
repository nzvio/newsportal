import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { TargetSchema } from "./schemas/target.schema";
import { TargetsService } from "./targets.service";
import { TargetsController } from "./targets.controller";
import { jwtConstants } from "../auth/auth.constants";
import { TargetsExecutorService } from "./targetsexecutor.service";
import { ArticleSchema } from "../articles/schemas/article.schema";
import { ServicesModule } from "../../services/services.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Target', schema: TargetSchema},
            {name: 'Article', schema: ArticleSchema},
        ]),        
        JwtModule.register(jwtConstants),
        HttpModule.register({timeout: 5000}),
        ServicesModule,
    ],
    controllers: [TargetsController],
    providers: [TargetsService, TargetsExecutorService],
    exports: [TargetsExecutorService],
})
export class TargetsModule {}
