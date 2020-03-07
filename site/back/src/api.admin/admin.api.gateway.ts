import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { IAnswer } from '../interfaces/answer.interface';
import { TargetsExecutorService } from './targets/targetsexecutor.service';

@WebSocketGateway(3019, {path: "/socket/admin"})
export class AdminAPIGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() public server: Server;  

    constructor(private targetsExecutor: TargetsExecutorService) {}  
    
    @SubscribeMessage('executeTarget')
    public msgExecuteTarget(client: Socket, msg: string): IAnswer<string> {        
        let _id: string = msg;
        this.targetsExecutor.executeOne(_id, this.server); // execute and translate log to all clients ("server" socket is used, not the "client" socket!)
        return {statusCode: 200, data: "target execution started"};
    }

    @SubscribeMessage('executeAllTargets')
    public msgExecuteAllTargets(client: Socket): IAnswer<string> {                
        this.targetsExecutor.executeAll(this.server); // execute and translate log to all clients ("server" socket is used, not the "client" socket!)
        return {statusCode: 200, data: "targets execution started"};
    }

    public afterInit(server: Server) {
        console.log("init");
    }    

    public handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }
}
