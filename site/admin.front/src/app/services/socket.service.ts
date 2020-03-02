import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { IAnswer } from '../model/answer.interface';

@Injectable()
export class SocketService {
    private host: string = "/";
    private socket: SocketIOClient.Socket;

    constructor(private appService: AppService) {
        this.socket = io(this.host, {path: "/socket/admin"});
        this.socket.on("connect", () => this.connected());
        this.socket.on("disconnect", () => this.disconnected());
        this.socket.on("error", (err: string) => {
            this.appService.monitorLog(`socket error: ${err}`, true);            
        });
    }

    public connect(): void {
        this.socket.connect();
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    private connected(): void {
        this.appService.monitorLog("socket connected");
    }

    private disconnected(): void {
        this.appService.monitorLog("socket disconnected");
    }

    public emit<X, Y>(eventName: string, message: X): Observable<IAnswer<Y>> {
        return new Observable<IAnswer<Y>>(observer => {            
            this.socket.emit(eventName, message, (res: IAnswer<Y>) => {
                if (res.statusCode === 200) {
                    observer.next(res);
                } else {
                    observer.error(res.error);
                }
                observer.complete();
            });
        });
    }

    public on<T>(eventName: string): Observable<IAnswer<T>> {        
        return new Observable<IAnswer<T>>(observer => {
            this.socket.off(eventName);
            this.socket.on(eventName, (res: IAnswer<T>) => {
                if (res.statusCode === 200) {
                    observer.next(res);
                } else {
                    observer.error(res.error);
                }
            });
        });
    }
}
