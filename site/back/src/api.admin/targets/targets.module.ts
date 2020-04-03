import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { TargetSchema } from "../../model/orm/schemas/target.schema";
import { TargetsService } from "./targets.service";
import { TargetsController } from "./targets.controller";
import { jwtConstants } from "../auth/auth.constants";
import { TargetsExecutorService } from "./targetsexecutor.service";
import { ArticleSchema } from "../../model/orm/schemas/article.schema";
import { CommonServicesModule } from "../../common.services/commonservices.module";
import { ParseerrorSchema } from "../../model/orm/schemas/parseerror.schema";
import { UserSchema } from "../../model/orm/schemas/user.schema";
import { TagSchema } from "../../model/orm/schemas/tag.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Target', schema: TargetSchema},
            {name: 'Article', schema: ArticleSchema},
            {name: 'Parseerror', schema: ParseerrorSchema},
            {name: 'User', schema: UserSchema},
            {name: 'Tag', schema: TagSchema},
        ]),        
        JwtModule.register(jwtConstants),
        HttpModule.register({timeout: 10000}),
        CommonServicesModule,
    ],
    controllers: [TargetsController],
    providers: [TargetsService, TargetsExecutorService],
    exports: [TargetsExecutorService],
})
export class TargetsModule {}
