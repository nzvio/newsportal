import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { IAnswer } from '../model/answer.interface';
import { Usergroup } from '../model/usergroup.model';

@Injectable()
export class DataService {
    private root: string = "/api/admin";

    constructor (private http: HttpClient) {}

    public updateParam (obj: string, _id: string, p: string, v:any): Observable<IAnswer<void>> {return this.sendRequest("POST", "objects/updateparam", {obj, _id, p, v});}

    public usergroupsAll(sortBy: string, sortDir: number): Observable<IAnswer<Usergroup[]>> {return this.sendRequest("POST", "usergroups/all", {sortBy, sortDir});}
    public usergroupsChunk(from: number, q: number, sortBy: string, sortDir: number): Observable<IAnswer<Usergroup[]>> {return this.sendRequest("POST", "usergroups/chunk", {from, q, sortBy, sortDir});}
    public usergroupDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `usergroups/delete/${_id}`);}
    public usergroupsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "usergroups/deletebulk", _ids);}

    
    // TODO
    // перед каждым запросом данных надо проверить, не просрочен ли токен, и если просрочен, то разлогинить и выкинуть на страницу логина
    
    
    private sendRequest (method: string, url: string, body: Object = {}, withProgress: boolean = false): Observable<any> | null {        
        if (method === "GET") {
            return this.http.get (`${this.root}/${url}`);
        } else if (method === "POST") {
            if (withProgress) {
                return this.http.post (`${this.root}/${url}`, body, {observe: "events", reportProgress: true});
            } else {
                return this.http.post (`${this.root}/${url}`, body);
            }                        
        } else if (method === "DELETE") {
            let options: Object = {body};
            return this.http.delete(`${this.root}/${url}`, options);
        } else {
            return null;
        }          
    }
}