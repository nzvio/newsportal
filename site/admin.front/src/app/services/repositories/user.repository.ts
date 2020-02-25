import { Injectable } from '@angular/core';

import { Repository } from './repository';
import { User } from '../../model/user.model';
import { DataService } from '../data.service';

@Injectable()
export class UserRepository extends Repository<User> {
    public schema: string = "User";

    constructor(protected dataService: DataService) {
        super(dataService);
    } 
    
    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.chunkLoadedAt < this.ttl) {
                resolve();
            } else {                
                this.dataService.usersChunk(this.chunkCurrentPart * this.chunkLength, this.chunkLength, this.chunkSortBy, this.chunkSortDir).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xlChunk = res.data.length ? res.data.map(d => new User().build(d)) : [];
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

    public loadOne(_id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.dataService.usersOne(_id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: User = new User().build(res.data);
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

    public delete(_id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.usersDelete(_id).subscribe(res => {
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
            this.dataService.usersDeleteBulk(_ids).subscribe(res => {
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

    public create(x: User): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.usersCreate(x).subscribe(res => {
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

    public update(x: User): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.usersUpdate(x).subscribe(res => {
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
