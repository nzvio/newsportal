import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ObjectsService } from "./objects.service";
import { UpdateParamDTO } from "./dto/updateparam.dto";
import { IAnswer } from "../../interfaces/answer.interface";
import { AuthGuard } from "../auth/auth.guard";
import { UpdateEgoisticParamDTO } from "./dto/updateegoisticparam.dto";
import { UpdateParamParamDTO } from "./dto/updateparamparam.dto";

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

    // update parameter of parameter of any object    
    @UseGuards(AuthGuard)
    @Post("updateparamparam")    
    public updateParamParam (@Body() dto: UpdateParamParamDTO): Promise<IAnswer<void>> {
        return this.objectsService.updateParamParam(dto);
    }
}
