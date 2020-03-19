import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent } from "@angular/common/http";
import { filter } from 'rxjs/operators';

import { IAnswer } from '../model/answer.interface';
import { Lang } from '../model/orm/lang.model';
import { IAuthData } from '../model/authdata.interface';
import { ErrorService } from './error.service';
import { Page } from '../model/orm/page.model';
import { Category } from '../model/orm/category.model';
import { IArticlesGetchunkDTO } from '../model/dto/articles.getchunk.dto';
import { Article } from '../model/orm/article.model';
import { ICommentsGetchunkDTO } from '../model/dto/comments.getchunk.dto';
import { Comment } from '../model/orm/comment.model';
import { IGetallDTO } from '../model/dto/getall.dto';
import { Setting } from '../model/orm/setting.model';
import { User } from '../model/orm/user.model';

@Injectable()
export class DataService {
    private root: string = "https://back.sc.vio.net.ua/api/visitor";
    public authData: IAuthData | null = null;                
    
    constructor (
        private http: HttpClient,
        private errorService: ErrorService,
    ) {}
    
    public langsAll(dto: IGetallDTO): Observable<IAnswer<Lang[]>> {return this.sendRequest("POST", "langs/all", dto, false);}
    public pagesAll(dto: IGetallDTO): Observable<IAnswer<Page[]>> {return this.sendRequest("POST", "pages/all", dto, false);}
    public categoriesAll(dto: IGetallDTO): Observable<IAnswer<Category[]>> {return this.sendRequest("POST", "categories/all", dto, false);}
    public articlesTop(dto: IArticlesGetchunkDTO): Observable<IAnswer<Article[]>> {return this.sendRequest("POST", "articles/top", dto, false);}
    public articlesMain(dto: IArticlesGetchunkDTO): Observable<IAnswer<Article[]>> {return this.sendRequest("POST", "articles/main", dto, false);}
    public articlesPopular(dto: IArticlesGetchunkDTO): Observable<IAnswer<Article[]>> {return this.sendRequest("POST", "articles/popular", dto, false);}
    public articlesRecommended(dto: IArticlesGetchunkDTO): Observable<IAnswer<Article[]>> {return this.sendRequest("POST", "articles/recommended", dto, false);}
    public articlesChunk(dto: IArticlesGetchunkDTO): Observable<IAnswer<Article[]>> {return this.sendRequest("POST", "articles/chunk", dto, false);}
    public articlesChunkBy(dto: IArticlesGetchunkDTO): Observable<IAnswer<Article[]>> {return this.sendRequest("POST", "articles/chunkby", dto, false);}
    public commentsChunk(dto: ICommentsGetchunkDTO): Observable<IAnswer<Comment[]>> {return this.sendRequest("POST", "comments/chunk", dto, false);}
    public tagsAll(dto: IGetallDTO): Observable<IAnswer<Comment[]>> {return this.sendRequest("POST", "tags/all", dto, false);}
    public settingsAll(): Observable<IAnswer<Setting[]>> {return this.sendRequest("GET", "settings/all", null, false);}
    public usersOne(_id: string): Observable<IAnswer<User>> {return this.sendRequest("GET", `users/one/${_id}`, null, false);}
    public login(email: string, password: string): Observable<IAnswer<IAuthData>> {return this.sendRequest("POST", "auth/login", {email, password}, false);}
    
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