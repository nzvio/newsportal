import { Controller, Post, Body } from "@nestjs/common";

import { ObjectsService } from "./objects.service";
import { UpdateparamDTO } from "./dto/updateparam.dto";
import { IAnswer } from "../../interfaces/answer.interface";

@Controller('api/admin/objects')
export class ObjectsController {
    constructor (private objectsService: ObjectsService) {}

    // update parameter of any object    
    @Post("updateparam")    
    public updateParam (@Body() dto: UpdateparamDTO): Promise<IAnswer<void>> {
        return this.objectsService.updateParam(dto);
    }
}
