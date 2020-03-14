import { Injectable } from "@angular/core";
import { SimpleRepository } from './_simple.repository';
import { Comment } from '../../model/orm/comment.model';
import { DataService } from '../data.service';
import { ICommentsGetchunkDTO } from '../../model/dto/comments.getchunk.dto';

@Injectable()
export class CommentRepository extends SimpleRepository<Comment> {
    public filterLang: string = "";

    constructor(protected dataService: DataService) {
        super(); 
        this.sortBy = "date";
        this.sortDir = -1;
        this.chunkLength = 3;        
    }

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            let dto: ICommentsGetchunkDTO = {from: 0, q: this.chunkLength, sortBy: this.sortBy, sortDir: this.sortDir, filterLang: this.filterLang};
            this.dataService.commentsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xl = res.data.length ? res.data.map(d => new Comment().build(d)) : [];
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
