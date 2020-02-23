import { Injectable } from '@angular/core';

import { Repository } from './repository';
import { Usergroup } from '../../model/usergroup.model';
import { DataService } from '../data.service';
import { ErrorService } from '../error.service';

@Injectable()
export class UsergroupRepository extends Repository<Usergroup> {
    public fullSortBy: string = "title";

    constructor(
        private dataService: DataService,
        private errorService: ErrorService,
    ) {
        super();
    }

    public loadFull(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.fullLoadedAt < this.ttl) {
                resolve();
            } else {
                this.dataService.usergroupsAll(this.fullSortBy, this.fullSortDir).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xlFull = res.data.length ? res.data.map(d => new Usergroup().build(d)) : [];
                        this.fullLength = this.xlFull.length;
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

    public loadOne(_id: string): Promise<Usergroup> {
        return new Promise((resolve, reject) => {
            this.dataService.usergroupsOne(_id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Usergroup = new Usergroup().build(res.data);                    
                        resolve(x);
                    } else {
                        reject("Object not found");
                    }                    
                } else {                    
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public updateParam (_id: string, p: string, v: any): Promise<void> {
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

    public delete(_id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.usergroupsDelete(_id).subscribe(res => {
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

    public deleteBulk(_ids: string[]): Promise<void> {
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

    public create(x: Usergroup): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.usergroupsCreate(x).subscribe(res => {
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

    public update(x: Usergroup): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.usergroupsUpdate(x).subscribe(res => {
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
