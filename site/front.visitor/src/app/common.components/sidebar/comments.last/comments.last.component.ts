import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { CommentRepository } from '../../../services/repositories/comment.repository';
import { AppService } from '../../../services/app.service';
import { Comment } from '../../../model/orm/comment.model';
import { Lang } from '../../../model/orm/lang.model';
import { SocketService } from '../../../services/socket.service';
import { Article } from '../../../model/orm/article.model';

@Component({
    selector: "comments-last",
    templateUrl: "./comments.last.component.html",
    styleUrls: ["./comments.last.component.scss"],
})
export class CommentsLastComponent implements OnInit, OnDestroy {
    public ready: boolean = false;
    private langSubscription: Subscription | null = null;
    private socketSubscription: Subscription | null = null;

    constructor(
        private commentRepository: CommentRepository,        
        private appService: AppService,
        private socketService: SocketService,
    ) {}

    get comments(): Comment[] {return this.commentRepository.xl;}
    get currentLang(): Lang {return this.appService.currentLang.value;}

    public async ngOnInit(): Promise<void> {
        this.appService.isBrowser ? this.initSocket() : null;
        this.langSubscription = this.appService.currentLang.subscribe(async lang => {
            try {
                this.ready = false;
                this.commentRepository.filterLang = lang._id;
                await this.commentRepository.load();   
                this.ready = true;
            } catch (err) {
                this.appService.showNotification(err, "error");
            }   
        });        
    }

    private initSocket(): void {
        this.socketSubscription = this.socketService.on<Comment>("comment-created").subscribe(msg => {            
            if (msg.statusCode === 200) {
                if ((msg.data.article as Article).lang === this.currentLang._id) {
                    this.comments.unshift(new Comment().build(msg.data));
                    this.comments.splice(this.comments.length-1, 1);
                }                
            } else {
                console.log(msg);
            }
        }, err => {
            this.appService.showNotification(err, "error");
            console.log(err);
        });
    }  

    public ngOnDestroy(): void {
        this.langSubscription ? this.langSubscription.unsubscribe() : null;
        this.socketSubscription ? this.socketSubscription.unsubscribe() : null;
    }    
}
