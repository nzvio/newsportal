import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { IAnswer } from './interfaces/answer.interface';
import { TargetsExecutor } from './modules/targets/targets.executor';

@WebSocketGateway(3020, {path: "/socket/admin"})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() public server: Server;  

    constructor(private targetsExecutor: TargetsExecutor) {}  
    
    @SubscribeMessage('executeTarget')
    public msgExecuteTarget(client: Socket, msg: string): IAnswer<string> {        
        let _id: string = msg;
        this.targetsExecutor.executeOne(_id, this.server); // execute and translate log to all clients ("server" socket is used, not the "client" socket!)

        return {statusCode: 200, data: "target started"};
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
