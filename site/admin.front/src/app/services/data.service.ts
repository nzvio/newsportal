import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IAnswer } from '../model/answer.interface';
import { Usergroup } from '../model/usergroup.model';
import { IAuthData } from "../model/authdata.interface";

@Injectable()
export class DataService {
    private root: string = "/api/admin";
    public authData: IAuthData | null = null;                
    
    constructor (private http: HttpClient) {}

    public login(email: string, password: string): Observable<IAnswer<IAuthData>> {return this.sendRequest("POST", "auth/login", {email, password}, false);}
    public updateParam (obj: string, _id: string, p: string, v:any): Observable<IAnswer<void>> {return this.sendRequest("POST", "objects/updateparam", {obj, _id, p, v}, true);}    

    public usergroupsAll(sortBy: string, sortDir: number): Observable<IAnswer<Usergroup[]>> {return this.sendRequest("POST", "usergroups/all", {sortBy, sortDir}, true);}
    public usergroupsChunk(from: number, q: number, sortBy: string, sortDir: number): Observable<IAnswer<Usergroup[]>> {return this.sendRequest("POST", "usergroups/chunk", {from, q, sortBy, sortDir}, true);}
    public usergroupsOne(_id: string): Observable<IAnswer<Usergroup>> {return this.sendRequest("GET", `usergroups/one/${_id}`, null, true);}
    public usergroupDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `usergroups/delete/${_id}`, null, true);}
    public usergroupsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "usergroups/deletebulk", _ids, true);}
    public usergroupsCreate(x: Usergroup): Observable<IAnswer<void>> {return this.sendRequest("POST", "usergroups/create", x, true);}
    public usergroupsUpdate(x: Usergroup): Observable<IAnswer<void>> {return this.sendRequest("POST", "usergroups/update", x, true);}
    
    private sendRequest (method: string, url: string, body: Object = {}, authNeeded: boolean, withProgress: boolean = false): Observable<any> | null {        
        let headers: HttpHeaders | null = null;

        if (authNeeded) {
            headers = new HttpHeaders({token: this.authData.token})
        }

        if (method === "GET") {
            return this.http.get (`${this.root}/${url}`, {headers});
        } else if (method === "POST") {
            if (withProgress) {
                return this.http.post (`${this.root}/${url}`, body, {headers, observe: "events", reportProgress: true});
            } else {
                return this.http.post (`${this.root}/${url}`, body, {headers});
            }                        
        } else if (method === "DELETE") {
            let options: Object = {body, headers};
            return this.http.delete(`${this.root}/${url}`, options);
        }                
        
        return null;                  
    }    
}