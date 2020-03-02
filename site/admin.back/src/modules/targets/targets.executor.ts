import { Injectable } from "@nestjs/common";
import { Socket, Server } from 'socket.io';
import { TargetsService } from "./targets.service";

@Injectable()
export class TargetsExecutor extends TargetsService {
    public executeOne(_id: string, socket: Socket | Server | null = null): void {
        let i: number = 0;
        let interval: any = setInterval(() => {
            if (i < 100) {
                socket.emit("targetExecuting", {statusCode: 200, data: `${new Date()} target executing...`});
            } else {
                socket.emit("targetExecuted", {statusCode: 200, data: `${new Date()} target executed!`});        
                clearInterval(interval);
            }

            i++;
        }, 100);      
    }
}
