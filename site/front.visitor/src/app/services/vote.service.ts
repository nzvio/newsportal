import { Injectable } from "@angular/core";

import { AppService } from './app.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { Lang } from '../model/orm/lang.model';
import { Article } from '../model/orm/article.model';
import { IVoteDTO } from '../model/dto/vote.dto';

@Injectable()
export class VoteService {
    constructor(
        private dataService: DataService,
        private appService: AppService,
        private authService: AuthService,        
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}

    public async voteForArticle(article: Article, rating): Promise<void> {
        if (!this.authService.authenticated) {
            this.appService.showNotification(this.currentLang.s("login-to-vote"));
            return;
        } else {
            const dto: IVoteDTO = {articleId: article._id, userId: this.authService.authData.user._id, rating};
            this.dataService.articlesVote(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    article.rating = res.data.rating;
                    article.votesq = res.data.votesq;
                } else if (res.statusCode === 409) {
                    this.appService.showNotification(this.currentLang.s("already-voted"));
                } else {
                    this.appService.showNotification(res.error, "error");
                }
            }, err => {
                this.appService.showNotification(err.message, "error");
            });
        }
    }
}
