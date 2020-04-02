import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Article } from '../../../model/orm/article.model';
import { AppService } from '../../../services/app.service';
import { Lang } from '../../../model/orm/lang.model';
import { AuthService } from '../../../services/auth.service';
import { CommentByArticleRepository } from '../../../services/repositories/commentbyarticle.repository';
import { Comment } from '../../../model/orm/comment.model';
import { SocketService } from '../../../services/socket.service';
import { User } from '../../../model/orm/user.model';

@Component({
    selector: "article-comments",
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit {
    @Input() article: Article;    
    public errorContent: boolean = false;
    public errorContentTxt: string = "&nbsp";
    public commentsReady: boolean = false;
    public comment: Comment;
    public tinyCfg: any = {branding: false, height: 300, width: "100%", menubar: false, statusbar: false, toolbar: 'bold italic alignleft aligncenter alignright', relative_urls: false, forced_root_block: false};
    @ViewChild("addcomment", {static: false}) addcommentElement: ElementRef;

    constructor(
        private appService: AppService,
        private authService: AuthService,
        private commentByArticleRepository: CommentByArticleRepository,
        private socketService: SocketService,
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}
    get authenticated(): boolean {return this.authService.authenticated;}
    get comments(): Comment[] {return this.commentByArticleRepository.xl;}

    public async ngOnInit(): Promise<void> {        
        this.initSocket();

        if (this.authenticated) {
            this.comment = new Comment().init(this.article._id, this.authService.authData.user._id);
        }
        
        this.commentByArticleRepository.xl = [];
		this.commentByArticleRepository.currentPart = 0;
		this.commentByArticleRepository.loadedAt = 0;
		this.commentByArticleRepository.filterArticle = this.article._id;		

		try {
			await this.commentByArticleRepository.load();
            this.commentsReady = true;            
        } catch (err) {
		    this.appService.showNotification(err, "error");
		}
    }

    private initSocket(): void {        
        this.socketService.on<Comment>("comment-created").subscribe(msg => {            
            (msg.statusCode === 200) ? this.comments.unshift(new Comment().build(msg.data)) : console.log(msg);
        }, err => {
            this.appService.showNotification(err, "error");
            console.log(err);
        });
    }    
    
    private validate(): boolean {
        let error: boolean = false;
        this.comment.content = this.comment.content.trim();

        if (!this.comment.content) {
            this.errorContent = true;
            this.errorContentTxt = this.currentLang.s("comments-error");
            error = true;
        } else {
            this.errorContent = false;
            this.errorContentTxt = "&nbsp";
        }

        return !error;
    }

    public send(): void {
        if (!this.validate()) {
            return;
        }        
        
        this.socketService.emit<Comment, void>("create-comment", this.comment).subscribe(res => {
            if (res.statusCode === 200) {
                this.comment = new Comment().init(this.article._id, this.authService.authData.user._id);
            } else {
                this.appService.showNotification(res.error, "error");
                console.log(res);
            }
        }, err => {
            this.appService.showNotification(err.message, "error");
            console.log(err);
        });
    }

    public answer(comment: Comment): void {
        this.comment.content.length ? this.comment.content += "<br><br>" : null;
        this.comment.content += `<strong>${(comment.user as User).name}</strong>, `;
        this.scrollToAddcomment();
    }

    public quote(comment: Comment): void {
        this.comment.content.length ? this.comment.content += "\n\n" : null;
        this.comment.content += `&gt;&gt;<em><strong>${(comment.user as User).name}</strong><br>${comment.content}</em><br><br>`;
        this.scrollToAddcomment();
    }

    private scrollToAddcomment(): void {
        //(this.addcommentElement.nativeElement as HTMLElement).scrollIntoView({block: "center"});
        const from: number = this.appService.wrapper.scrollTop;
        const to: number = (this.addcommentElement.nativeElement as HTMLElement).offsetTop - 70;        
        from > to ? this.appService.smoothScroll(from, to, 300, this.appService.wrapper) : null;
    }
}
