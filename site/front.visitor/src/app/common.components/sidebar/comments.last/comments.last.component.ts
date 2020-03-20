import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { CommentRepository } from '../../../services/repositories/comment.repository';
import { AppService } from '../../../services/app.service';
import { Comment } from '../../../model/orm/comment.model';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Lang } from '../../../model/orm/lang.model';

@Component({
    selector: "comments-last",
    templateUrl: "./comments.last.component.html",
    styleUrls: ["./comments.last.component.scss"],
})
export class CommentsLastComponent implements OnInit, OnDestroy {
    public ready: boolean = false;
    private langSubscription: Subscription;

    constructor(
        private commentRepository: CommentRepository,
        private langRepository: LangRepository,
        private appService: AppService,
    ) {}

    get comments(): Comment[] {return this.commentRepository.xl;}
    get currentLang(): Lang {return this.langRepository.current.value;}

    public async ngOnInit(): Promise<void> {
        this.langSubscription = this.langRepository.current.subscribe(async lang => {
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

    public ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }    
}
