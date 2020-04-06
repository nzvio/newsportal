import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent } from "@angular/common/http";
import { filter } from 'rxjs/operators';

import { IAnswer } from '../model/answer.interface';
import { IImagable } from '../model/imagable.interface';
import { Usergroup } from '../model/orm/usergroup.model';
import { IAuthData } from "../model/authdata.interface";
import { User } from '../model/orm/user.model';
import { ErrorService } from './error.service';
import { AdmLang } from '../model/admlang.model';
import { Lang } from '../model/orm/lang.model';
import { Page } from '../model/orm/page.model';
import { Category } from '../model/orm/category.model';
import { Article } from '../model/orm/article.model';
import { IArticlesGetchunkDTO } from '../model/dto/articles.getchunk.dto';
import { Donor } from '../model/orm/donor.model';
import { Target } from '../model/orm/target.model';
import { Parseerror } from "../model/orm/parseerror.model";
import { Comment } from "../model/orm/comment.model";
import { IGetallDTO } from '../model/dto/getall.dto';
import { IGetchunkDTO } from '../model/dto/getchunk.dto';
import { ICommentsGetallDTO } from '../model/dto/comments.getall.dto';
import { Tag } from '../model/orm/tag.model';
import { Setting } from '../model/orm/setting.model';

@Injectable()
export class DataService {
    private root: string = "https://back.sc.vio.net.ua/api/admin";
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

    public usergroupsAll(dto: IGetallDTO): Observable<IAnswer<Usergroup[]>> {return this.sendRequest("POST", "usergroups/all", dto, true);}
    public usergroupsChunk(dto: IGetchunkDTO): Observable<IAnswer<Usergroup[]>> {return this.sendRequest("POST", "usergroups/chunk", dto, true);}
    public usergroupsOne(_id: string): Observable<IAnswer<Usergroup>> {return this.sendRequest("GET", `usergroups/one/${_id}`, null, true);}
    public usergroupsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `usergroups/delete/${_id}`, null, true);}
    public usergroupsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "usergroups/deletebulk", _ids, true);}
    public usergroupsCreate(x: Usergroup): Observable<IAnswer<void>> {return this.sendRequest("POST", "usergroups/create", x, true);}
    public usergroupsUpdate(x: Usergroup): Observable<IAnswer<void>> {return this.sendRequest("POST", "usergroups/update", x, true);}
    
    public usersAll(dto: IGetallDTO): Observable<IAnswer<User[]>> {return this.sendRequest("POST", "users/all", dto, true);}
    public usersChunk(dto: IGetchunkDTO): Observable<IAnswer<User[]>> {return this.sendRequest("POST", "users/chunk", dto, true);}
    public usersOne(_id: string): Observable<IAnswer<User>> {return this.sendRequest("GET", `users/one/${_id}`, null, true);}
    public usersDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `users/delete/${_id}`, null, true);}
    public usersDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "users/deletebulk", _ids, true);}
    public usersCreate(x: User): Observable<IAnswer<void>> {return this.sendRequest("POST", "users/create", x, true);}
    public usersUpdate(x: User): Observable<IAnswer<void>> {return this.sendRequest("POST", "users/update", x, true);}    

    public langsAll(dto: IGetallDTO): Observable<IAnswer<Lang[]>> {return this.sendRequest("POST", "langs/all", dto, true);}
    public langsChunk(dto: IGetchunkDTO): Observable<IAnswer<Lang[]>> {return this.sendRequest("POST", "langs/chunk", dto, true);}
    public langsOne(_id: string): Observable<IAnswer<Lang>> {return this.sendRequest("GET", `langs/one/${_id}`, null, true);}
    public langsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `langs/delete/${_id}`, null, true);}
    public langsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "langs/deletebulk", _ids, true);}
    public langsCreate(x: Lang): Observable<IAnswer<void>> {return this.sendRequest("POST", "langs/create", x, true);}
    public langsUpdate(x: Lang): Observable<IAnswer<void>> {return this.sendRequest("POST", "langs/update", x, true);}    

    public pagesAll(dto: IGetallDTO): Observable<IAnswer<Page[]>> {return this.sendRequest("POST", "pages/all", dto, true);}
    public pagesChunk(dto: IGetchunkDTO): Observable<IAnswer<Page[]>> {return this.sendRequest("POST", "pages/chunk", dto, true);}
    public pagesOne(_id: string): Observable<IAnswer<Page>> {return this.sendRequest("GET", `pages/one/${_id}`, null, true);}
    public pagesDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `pages/delete/${_id}`, null, true);}
    public pagesDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "pages/deletebulk", _ids, true);}
    public pagesCreate(x: Page): Observable<IAnswer<void>> {return this.sendRequest("POST", "pages/create", x, true);}
    public pagesUpdate(x: Page): Observable<IAnswer<void>> {return this.sendRequest("POST", "pages/update", x, true);}  

    public categoriesAll(dto: IGetallDTO): Observable<IAnswer<Category[]>> {return this.sendRequest("POST", "categories/all", dto, true);}
    public categoriesChunk(dto: IGetchunkDTO): Observable<IAnswer<Category[]>> {return this.sendRequest("POST", "categories/chunk", dto, true);}
    public categoriesOne(_id: string): Observable<IAnswer<Category>> {return this.sendRequest("GET", `categories/one/${_id}`, null, true);}
    public categoriesDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `categories/delete/${_id}`, null, true);}
    public categoriesDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "categories/deletebulk", _ids, true);}
    public categoriesCreate(x: Category): Observable<IAnswer<void>> {return this.sendRequest("POST", "categories/create", x, true);}
    public categoriesUpdate(x: Category): Observable<IAnswer<void>> {return this.sendRequest("POST", "categories/update", x, true);}    

    public articlesChunk(dto: IArticlesGetchunkDTO): Observable<IAnswer<Article[]>> {return this.sendRequest("POST", "articles/chunk", dto, true);}
    public articlesOne(_id: string): Observable<IAnswer<Article>> {return this.sendRequest("GET", `articles/one/${_id}`, null, true);}
    public articlesDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `articles/delete/${_id}`, null, true);}
    public articlesDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "articles/deletebulk", _ids, true);}
    public articlesCreate(x: Article): Observable<IAnswer<void>> {return this.sendRequest("POST", "articles/create", x, true);}
    public articlesUpdate(x: Article): Observable<IAnswer<void>> {return this.sendRequest("POST", "articles/update", x, true);}    

    public donorsAll(dto: IGetallDTO): Observable<IAnswer<Donor[]>> {return this.sendRequest("POST", "donors/all", dto, true);}
    public donorsChunk(dto: IGetchunkDTO): Observable<IAnswer<Donor[]>> {return this.sendRequest("POST", "donors/chunk", dto, true);}
    public donorsOne(_id: string): Observable<IAnswer<Donor>> {return this.sendRequest("GET", `donors/one/${_id}`, null, true);}
    public donorsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `donors/delete/${_id}`, null, true);}
    public donorsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "donors/deletebulk", _ids, true);}
    public donorsCreate(x: Donor): Observable<IAnswer<void>> {return this.sendRequest("POST", "donors/create", x, true);}
    public donorsUpdate(x: Donor): Observable<IAnswer<void>> {return this.sendRequest("POST", "donors/update", x, true);}

    public targetsChunk(dto: IGetchunkDTO): Observable<IAnswer<Target[]>> {return this.sendRequest("POST", "targets/chunk", dto, true);}
    public targetsOne(_id: string): Observable<IAnswer<Target>> {return this.sendRequest("GET", `targets/one/${_id}`, null, true);}
    public targetsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `targets/delete/${_id}`, null, true);}
    public targetsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "targets/deletebulk", _ids, true);}
    public targetsCreate(x: Target): Observable<IAnswer<void>> {return this.sendRequest("POST", "targets/create", x, true);}
    public targetsUpdate(x: Target): Observable<IAnswer<void>> {return this.sendRequest("POST", "targets/update", x, true);}
    
    public parseerrorsChunk(dto: IGetchunkDTO): Observable<IAnswer<Parseerror[]>> {return this.sendRequest("POST", "parseerrors/chunk", dto, true);}
    public parseerrorsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `parseerrors/delete/${_id}`, null, true);}
    public parseerrorsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "parseerrors/deletebulk", _ids, true);}    

    public commentsAllByArticle(dto: ICommentsGetallDTO): Observable<IAnswer<Comment[]>> {return this.sendRequest("POST", "comments/allbyarticle", dto, true);}
    public commentsUpdate(x: Comment): Observable<IAnswer<void>> {return this.sendRequest("POST", "comments/update", x, true);}
    public commentsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `comments/delete/${_id}`, null, true);}

    public tagsAll(dto: IGetallDTO): Observable<IAnswer<Tag[]>> {return this.sendRequest("POST", "tags/all", dto, true);}
    public tagsChunk(dto: IGetchunkDTO): Observable<IAnswer<Tag[]>> {return this.sendRequest("POST", "tags/chunk", dto, true);}
    public tagsOne(_id: string): Observable<IAnswer<Tag>> {return this.sendRequest("GET", `tags/one/${_id}`, null, true);}
    public tagsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `tags/delete/${_id}`, null, true);}
    public tagsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "tags/deletebulk", _ids, true);}
    public tagsCreate(x: Tag): Observable<IAnswer<void>> {return this.sendRequest("POST", "tags/create", x, true);}
    public tagsUpdate(x: Tag): Observable<IAnswer<void>> {return this.sendRequest("POST", "tags/update", x, true);}

    public settingsChunk(dto: IGetchunkDTO): Observable<IAnswer<Setting[]>> {return this.sendRequest("POST", "settings/chunk", dto, true);}
    public settingsDelete(_id: string): Observable<IAnswer<void>> {return this.sendRequest("DELETE", `settings/delete/${_id}`, null, true);}
    public settingsDeleteBulk(_ids: string[]): Observable<IAnswer<void>> {return this.sendRequest("DELETE", "settings/deletebulk", _ids, true);}    
    public settingsCreate(x: Setting): Observable<IAnswer<void>> {return this.sendRequest("POST", "settings/create", x, true);}

    public statArticlesPerMonth(): Observable<IAnswer<number[]>> {return this.sendRequest("GET", "stat/articlespermonth", null, true);}
    
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