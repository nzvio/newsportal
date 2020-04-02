import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { CommentCreateDTO } from "./comments/dto/comment.create.dto";
import { IAnswer } from '../model/answer.interface';
import { CommentsService } from './comments/comments.service';

@WebSocketGateway(3020, {path: "/socket/visitor"})
export class VisitorAPIGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() public server: Server;  

    constructor(private commentsService: CommentsService) {}  
    
    @SubscribeMessage('create-comment')
    public createComment(client: Socket, msg: CommentCreateDTO): Promise<IAnswer<void>> {
        return this.commentsService.create(this.server, msg);
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
