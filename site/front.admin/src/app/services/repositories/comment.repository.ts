import { Injectable } from "@angular/core";

import { Repository } from './_repository';
import { Comment } from '../../model/orm/comment.model';
import { DataService } from '../data.service';
import { ICommentsGetallDTO } from 'src/app/model/dto/comments.getall.dto';

@Injectable()
export class CommentRepository extends Repository<Comment> {
    public schema: string = "Comment";
    public fullSortBy: string = "date";
    public fullSortDir: number = -1;

    private articleId: string = "";

    constructor(protected dataService: DataService) {
        super(dataService);
    }

    public loadFullByArticle(articleId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.articleId === articleId && new Date().getTime() - this.fullLoadedAt < this.ttl) {
                resolve();
            } else {
                this.articleId = articleId;
                const dto: ICommentsGetallDTO = {
                    filterArticle: this.articleId,
                    sortBy: this.fullSortBy,
                    sortDir: this.fullSortDir,
                };
                this.dataService
                    .commentsAllByArticle(dto)
                    .subscribe(res => {
                        if (res.statusCode === 200) {
                            this.xlFull = res.data.length ? res.data.map(d => new Comment().build(d)) : [];                            
                            this.fullLoadedAt = new Date().getTime();
                            resolve();
                        } else {
                            reject(res.error);
                        }
                    }, err => {
                        reject(err.message);
                    });
            }
        });
    }

    public delete(_id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.commentsDelete(_id).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public update(x: Comment): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.commentsUpdate(x).subscribe(res => {
                if (res.statusCode === 200) {
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
