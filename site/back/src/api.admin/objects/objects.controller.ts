import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ObjectsService } from "./objects.service";
import { UpdateParamDTO } from "./dto/updateparam.dto";
import { IAnswer } from "../../model/answer.interface";
import { AuthGuard } from "../auth/auth.guard";
import { UpdateEgoisticParamDTO } from "./dto/updateegoisticparam.dto";

@Controller('api/admin/objects')
export class ObjectsController {
    constructor (private objectsService: ObjectsService) {}

    // update parameter of any object    
    @UseGuards(AuthGuard)
    @Post("updateparam")    
    public updateParam (@Body() dto: UpdateParamDTO): Promise<IAnswer<void>> {
        return this.objectsService.updateParam(dto);
    }

    // update "egoistic" parameter of any object ("egoistic" means that only one can be true in table)   
    @UseGuards(AuthGuard)
    @Post("updateegoisticparam")    
    public updateEgoisticParam (@Body() dto: UpdateEgoisticParamDTO): Promise<IAnswer<void>> {
        return this.objectsService.updateEgoisticParam(dto);
    }   
}
