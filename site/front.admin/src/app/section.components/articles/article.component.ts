import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Category } from '../../model/orm/category.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/orm/lang.model';
import { SlugService } from '../../services/slug.service';
import { Article } from '../../model/orm/article.model';
import { Comment } from '../../model/orm/comment.model';
import { User } from '../../model/orm/user.model';
import { Tag } from '../../model/orm/tag.model';

@Component({
    selector: "the-article",
    templateUrl: "./article.component.html"
})
export class ArticleComponent extends ObjectComponent implements OnInit {    
    @Input() x: Article;   
    @Input() ll: Lang[]; 
    @Input() cl: Category[];    
    @Input() ul: User[];
    @Input() tl: Tag[];
    @Input() canBuildSlug: boolean = false;
    @Input() canEditComments: boolean = false;
    @Input() comments: Comment[] = [];
    @Output() deleteComment: EventEmitter<string> = new EventEmitter();
    @Output() updateComment: EventEmitter<Comment> = new EventEmitter();
    public tab: number = 1;     
    public selectedLang: Lang;   

    constructor(private slugService: SlugService) {
        super();
    }

    get tags(): Tag[] {return (this.x.lang) ? this.tl.filter(t => t.lang === this.x.lang) : this.tl;}

    public ngOnInit(): void {
        this.selectedLang = this.ll[0];            
    }
    
    public buildSlug(name: string): void {
        this.x.slug = this.slugService.buildSlug(name);
    }

    public onDeleteComment(_id: string): void {
        this.deleteComment.emit(_id);
    }

    public onUpdateComment(comment: Comment): void {
        this.updateComment.emit(comment);
    }
}
