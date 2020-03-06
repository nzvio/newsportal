import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { IAnswer } from '../model/answer.interface';

@Injectable()
export class SocketService {
    private host: string = "https://back.sc.vio.net.ua";
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

    public emit<T1, T2>(eventName: string, message: T1 = null): Observable<IAnswer<T2>> {
        return new Observable<IAnswer<T2>>(observer => {            
            this.socket.emit(eventName, message, (res: IAnswer<T2>) => {                
                observer.next(res);                
                observer.complete();
            });
        });
    }

    public on<T>(eventName: string): Observable<IAnswer<T>> {        
        return new Observable<IAnswer<T>>(observer => {
            this.socket.off(eventName);
            this.socket.on(eventName, (res: IAnswer<T>) => {
                observer.next(res);
            });
        });
    }
}
