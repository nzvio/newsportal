import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Usergroup } from '../../model/orm/usergroup.model';
import { DataService } from '../data.service';
import { IGetallDTO } from "../../model/dto/getall.dto";
import { IGetchunkDTO } from 'src/app/model/dto/getchunk.dto';

@Injectable()
export class UsergroupRepository extends Repository<Usergroup> {
    public schema: string = "Usergroup";
    public fullSortBy: string = "title";

    constructor(protected dataService: DataService) {
        super(dataService);
    }

    public loadFull(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (new Date().getTime() - this.fullLoadedAt < this.ttl) {
                resolve();
            } else {
                const dto: IGetallDTO = {
                    sortBy: this.fullSortBy,
                    sortDir: this.fullSortDir,                    
                };
                this.dataService.usergroupsAll(dto).subscribe(res => {
                    if (res.statusCode === 200) {
                        this.xlFull = res.data.length ? res.data.map(d => new Usergroup().build(d)) : [];                        
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
                const dto: IGetchunkDTO = {
                    from: this.chunkCurrentPart * this.chunkLength,
                    q: this.chunkLength,
                    sortBy: this.chunkSortBy,
                    sortDir: this.chunkSortDir,                    
                };
                this.dataService.usergroupsChunk(dto).subscribe(res => {
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
