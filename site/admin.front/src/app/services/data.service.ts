import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent } from "@angular/common/http";
import { filter } from 'rxjs/operators';

import { IAnswer } from '../model/answer.interface';
import { IImagable } from '../model/imagable.interface';
import { Usergroup } from '../model/usergroup.model';
import { IAuthData } from "../model/authdata.interface";
import { User } from '../model/user.model';
import { ErrorService } from './error.service';
import { AdmLang } from '../model/admlang.model';
import { Lang } from '../model/lang.model';
import { Page } from '../model/page.model';
import { Category } from '../model/category.model';
import { Article } from '../model/article.model';
import { ArticlesGetchunkDTO } from '../model/articles.getchunk.dto';

@Injectable()
export class DataService {
    private root: string = "/api/admin";
    public authData: IAuthData | null = null;                
    
    constructor (
        private http: HttpClient,
        private errorService: ErrorService,
    ) {}

    public admlangs(): Observable<AdmLang[]> {return this.http.get<AdmLang[]>("/assets/json/admin.languages.json");}
    public login(email: string, password: string): Observable<IAnswer<IAuthData>> {return this.sendRequest("POST", "auth/login", {email, password}, false);}
    public updateParam (obj: string, _id: string, p: string, v:any): Observable<IAnswer<void>> {return this.sendRequest("POST", "objects/updateparam", {obj, _id, p, v}, true);}    
    public updateEgoisticParam (obj: string, _id: string, p: string, v:boolean): Observable<IAnswer<void>> {return this.sendRequest("POST", "objects/updateegoisticparam", {obj, _id, p, v}, true);}        
    public upload (fd: FormData): Observable<HttpEvent<IAnswer<string>>> {return this.sendRequest("POST", `files/upload`, fd, true, true);}
    public uploadImg (fd: FormData): Observable<HttpEvent<IAnswer<IImagable>>> {return this.sendRequest("POST", `files/img/upload`, fd, true, true);}
    public uploadImgWithCopy (fd: FormData, width: number): Observable<HttpEvent<IAnswer<IImagable>>> {return this.sendRequest("POST", `files/img/uploadwithcopy/${width}`, fd, true, true);}

    public usergroupsAll(sortBy: string, sortDir: number): Observable<IAnswer<Usergroup[]>> {return this.sendRequest("POST", "usergroups/all", {sortBy, sortDir}, true);}
    public usergroupsChunk(from: number, q: number, sortBy: string, sortDir: number): Observable<IAnswer<Usergroup[]>> {return this.sendRequest("POST", "usergroups/chunk", {from, q, sortBy, sortDir}, true);}
    public usergroupsOne(_id: string): Observable<IAnswer<Usergroup>> {return this.sendRequest("GET", `usergroups/one/${_id}`, null, true);}
    public usergroupsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `usergroups/delete/${_id}`, null, true);}
    public usergroupsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "usergroups/deletebulk", _ids, true);}
    public usergroupsCreate(x: Usergroup): Observable<IAnswer<void>> {return this.sendRequest("POST", "usergroups/create", x, true);}
    public usergroupsUpdate(x: Usergroup): Observable<IAnswer<void>> {return this.sendRequest("POST", "usergroups/update", x, true);}

    public usersChunk(from: number, q: number, sortBy: string, sortDir: number): Observable<IAnswer<User[]>> {return this.sendRequest("POST", "users/chunk", {from, q, sortBy, sortDir}, true);}
    public usersOne(_id: string): Observable<IAnswer<User>> {return this.sendRequest("GET", `users/one/${_id}`, null, true);}
    public usersDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `users/delete/${_id}`, null, true);}
    public usersDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "users/deletebulk", _ids, true);}
    public usersCreate(x: User): Observable<IAnswer<void>> {return this.sendRequest("POST", "users/create", x, true);}
    public usersUpdate(x: User): Observable<IAnswer<void>> {return this.sendRequest("POST", "users/update", x, true);}    

    public langsAll(sortBy: string, sortDir: number): Observable<IAnswer<Lang[]>> {return this.sendRequest("POST", "langs/all", {sortBy, sortDir}, true);}
    public langsChunk(from: number, q: number, sortBy: string, sortDir: number): Observable<IAnswer<Lang[]>> {return this.sendRequest("POST", "langs/chunk", {from, q, sortBy, sortDir}, true);}
    public langsOne(_id: string): Observable<IAnswer<Lang>> {return this.sendRequest("GET", `langs/one/${_id}`, null, true);}
    public langsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `langs/delete/${_id}`, null, true);}
    public langsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "langs/deletebulk", _ids, true);}
    public langsCreate(x: Lang): Observable<IAnswer<void>> {return this.sendRequest("POST", "langs/create", x, true);}
    public langsUpdate(x: Lang): Observable<IAnswer<void>> {return this.sendRequest("POST", "langs/update", x, true);}    

    public pagesAll(sortBy: string, sortDir: number): Observable<IAnswer<Page[]>> {return this.sendRequest("POST", "pages/all", {sortBy, sortDir}, true);}
    public pagesChunk(from: number, q: number, sortBy: string, sortDir: number): Observable<IAnswer<Page[]>> {return this.sendRequest("POST", "pages/chunk", {from, q, sortBy, sortDir}, true);}
    public pagesOne(_id: string): Observable<IAnswer<Page>> {return this.sendRequest("GET", `pages/one/${_id}`, null, true);}
    public pagesDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `pages/delete/${_id}`, null, true);}
    public pagesDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "pages/deletebulk", _ids, true);}
    public pagesCreate(x: Page): Observable<IAnswer<void>> {return this.sendRequest("POST", "pages/create", x, true);}
    public pagesUpdate(x: Page): Observable<IAnswer<void>> {return this.sendRequest("POST", "pages/update", x, true);}  

    public categoriesAll(sortBy: string, sortDir: number): Observable<IAnswer<Category[]>> {return this.sendRequest("POST", "categories/all", {sortBy, sortDir}, true);}
    public categoriesChunk(from: number, q: number, sortBy: string, sortDir: number): Observable<IAnswer<Category[]>> {return this.sendRequest("POST", "categories/chunk", {from, q, sortBy, sortDir}, true);}
    public categoriesOne(_id: string): Observable<IAnswer<Category>> {return this.sendRequest("GET", `categories/one/${_id}`, null, true);}
    public categoriesDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `categories/delete/${_id}`, null, true);}
    public categoriesDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "categories/deletebulk", _ids, true);}
    public categoriesCreate(x: Category): Observable<IAnswer<void>> {return this.sendRequest("POST", "categories/create", x, true);}
    public categoriesUpdate(x: Category): Observable<IAnswer<void>> {return this.sendRequest("POST", "categories/update", x, true);}    

    public articlesChunk(dto: ArticlesGetchunkDTO): Observable<IAnswer<Article[]>> {return this.sendRequest("POST", "articles/chunk", dto, true);}
    public articlesOne(_id: string): Observable<IAnswer<Article>> {return this.sendRequest("GET", `articles/one/${_id}`, null, true);}
    public articlesDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `articles/delete/${_id}`, null, true);}
    public articlesDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "articles/deletebulk", _ids, true);}
    public articlesCreate(x: Article): Observable<IAnswer<void>> {return this.sendRequest("POST", "articles/create", x, true);}
    public articlesUpdate(x: Article): Observable<IAnswer<void>> {return this.sendRequest("POST", "articles/update", x, true);}    
    
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