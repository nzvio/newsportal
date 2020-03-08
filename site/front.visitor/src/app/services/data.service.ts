import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent } from "@angular/common/http";
import { filter } from 'rxjs/operators';

import { IAnswer } from '../model/answer.interface';
import { Lang } from '../model/lang.model';
import { IAuthData } from '../model/authdata.interface';
import { ErrorService } from './error.service';
import { Page } from '../model/page.model';
import { Category } from '../model/category.model';

@Injectable()
export class DataService {
    private root: string = "https://back.sc.vio.net.ua/api/visitor";
    public authData: IAuthData | null = null;                
    
    constructor (
        private http: HttpClient,
        private errorService: ErrorService,
    ) {}
    
    public langsAll(sortBy: string, sortDir: number): Observable<IAnswer<Lang[]>> {return this.sendRequest("POST", "langs/all", {sortBy, sortDir}, false);}
    public pagesAll(sortBy: string, sortDir: number): Observable<IAnswer<Page[]>> {return this.sendRequest("POST", "pages/all", {sortBy, sortDir}, false);}
    public categoriesAll(sortBy: string, sortDir: number): Observable<IAnswer<Category[]>> {return this.sendRequest("POST", "categories/all", {sortBy, sortDir}, false);}
    
    private sendRequest (method: string, url: string, body: Object = {}, authNeeded: boolean, withProgress: boolean = false): Observable<any> | null {        
        let headers: HttpHeaders | null = null;

        if (authNeeded) {
            headers = new HttpHeaders({token: this.authData.token})
        }

        if (method === "GET") {
            return this.http
                .get (`${this.root}/${url}`, {headers})
                .pipe(filter(res => this.errorService.processResponse(res)));
        } else if (method === "POST") {
            if (withProgress) {
                return this.http
                    .post (`${this.root}/${url}`, body, {headers, observe: "events", reportProgress: true})
                    .pipe(filter(res => this.errorService.processResponse(res)));
            } else {
                return this.http
                    .post (`${this.root}/${url}`, body, {headers})
                    .pipe(filter(res => this.errorService.processResponse(res)));
            }                        
        } else if (method === "DELETE") {
            let options: Object = {body, headers};
            return this.http
                .delete(`${this.root}/${url}`, options)
                .pipe(filter(res => this.errorService.processResponse(res)));
        }                
        
        return null;                  
    }    
}