import { Injectable } from '@angular/core';

import { Repository } from './repository';
import { Usergroup } from '../../model/usergroup.model';
import { DataService } from '../data.service';
import { IAnswer } from 'src/app/model/answer.interface';

@Injectable()
export class UsergroupRepository extends Repository<Usergroup> {
    constructor(private dataService: DataService) {
        super();
    }

    /*public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.loadedAt < this.ttl) {
                resolve();
            } else {
                this.dataService.usergroupsAll().subscribe(res => {
                    this.xl = res.data.length ? res.data.map(d => new Usergroup().build(d)) : [];
                    this.length = this.xl.length;
                    this.loadedAt = new Date().getTime();
                    resolve();                
                }, err => {
                    reject(err);
                });
            }            
        });
    }*/
    
    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.chunkLoadedAt < this.ttl) {
                resolve();
            } else {                
                this.dataService.usergroupsChunk(this.chunkCurrentPart * this.chunkLength, this.chunkLength, this.chunkSortBy, this.chunkSortDir).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xlChunk = res.data.length ? res.data.map(d => new Usergroup().build(d)) : [];
                        this.fullLength = res.fullLength;
                        this.chunkLoadedAt = new Date().getTime();                    
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

    public updateParam (_id: string, p: string, v: any): Promise<IAnswer<void>> {
        return new Promise((resolve, reject) => {
            this.dataService.updateParam ("Usergroup", _id, p, v).subscribe(res => {
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

    public delete(_id: string): Promise<IAnswer<void>> {
        return new Promise((resolve, reject) => {
            this.dataService.usergroupDelete(_id).subscribe(res => {
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

    public deleteBulk(_ids: string[]): Promise<IAnswer<void>> {
        return new Promise((resolve, reject) => {
            this.dataService.usergroupsDeleteBulk(_ids).subscribe(res => {
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
