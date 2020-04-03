import { Injectable } from "@angular/core";

import { AppService } from './app.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { Lang } from '../model/orm/lang.model';
import { Article } from '../model/orm/article.model';
import { IArticleVoteDTO } from '../model/dto/articlevote.dto';
import { Comment } from '../model/orm/comment.model';
import { ICommentVoteDTO } from '../model/dto/commentvote.dto';

@Injectable()
export class VoteService {
    constructor(
        private dataService: DataService,
        private appService: AppService,
        private authService: AuthService,        
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}

    public voteForArticle(article: Article, rating): void {
        if (!this.authService.authenticated) {
            this.appService.showNotification(this.currentLang.s("login-to-vote"));
            return;
        } 

        const dto: IArticleVoteDTO = {articleId: article._id, userId: this.authService.authData.user._id, rating};
        this.dataService.articlesVote(dto).subscribe(res => {
            if (res.statusCode === 200) {
                article.rating = res.data.rating;
                article.votesq = res.data.votesq;
            } else if (res.statusCode === 409) {
                this.appService.showNotification(this.currentLang.s("already-voted-article"));
            } else {
                this.appService.showNotification(res.error, "error");
            }
        }, err => {
            this.appService.showNotification(err.message, "error");
        });
    }

    public voteForComment(comment: Comment, vote: number): void {
        if (!this.authService.authenticated) {
            this.appService.showNotification(this.currentLang.s("login-to-vote"));
            return;
        } 

        const dto: ICommentVoteDTO = {commentId: comment._id, userId: this.authService.authData.user._id, vote};
        this.dataService.commentsVote(dto).subscribe(res => {
            if (res.statusCode === 200) {
                vote === 1 ? comment.likes++ : null;
                vote === -1 ? comment.dislikes++ : null;
            } else if (res.statusCode === 409) {
                this.appService.showNotification(this.currentLang.s("already-voted-comment"));
            } else {
                this.appService.showNotification(res.error, "error");
            }
        }, err => {
            this.appService.showNotification(err.message, "error");
        });
    }
}
