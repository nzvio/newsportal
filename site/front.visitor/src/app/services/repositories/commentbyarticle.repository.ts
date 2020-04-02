import { Injectable } from "@angular/core";
import { SimpleRepository } from './_simple.repository';
import { Comment } from '../../model/orm/comment.model';
import { DataService } from '../data.service';
import { ICommentsGetchunkDTO } from '../../model/dto/comments.getchunk.dto';

@Injectable()
export class CommentByArticleRepository extends SimpleRepository<Comment> {
    public filterArticle: string = "";
    public exhausted: boolean = false;

    constructor(protected dataService: DataService) {
        super(); 
        this.sortBy = "date";
        this.sortDir = -1;
        this.chunkLength = 10;        
    }

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            let dto: ICommentsGetchunkDTO = {
                from: this.currentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.sortBy,
                sortDir: this.sortDir,                                
                filterArticle: this.filterArticle,
                filterLoadedAt: this.loadedAt,                
            };            
            this.dataService.commentsChunkByArticle(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    const data = res.data.length ? res.data.map(d => new Comment().build(d)) : [];
                    this.xl = [...this.xl, ...data];
                    this.fullLength = res.fullLength;                                     
                    this.exhausted = !this.fullLength || this.currentPart + 1 === Math.ceil(this.fullLength / this.chunkLength);
                    // time of first load, will be used in "infinite scroll" on "loading more"
                    // articles, that created after first load, will not be displayed
                    !this.loadedAt ? this.loadedAt = new Date().getTime() : null; 
                    resolve();
                } else {                        
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });            
        });
    }
}
