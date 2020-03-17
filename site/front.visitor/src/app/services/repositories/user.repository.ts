import { Injectable } from "@angular/core";

import { SimpleRepository } from './_simple.repository';
import { DataService } from '../data.service';
import { User } from '../../model/orm/user.model';

@Injectable()
export class UserRepository extends SimpleRepository<User> {
    constructor(protected dataService: DataService) {
        super();     
    }

    public async getOne(_id): Promise<User | null> {        
        const user: User | null = this.xl.find(x => x._id === _id) || null;        
        
        if (!user || new Date().getTime() - user.__loadedat > this.ttl) {                        
            return this.load(_id);
        } else {                        
            return user;
        }
    }

    private load(_id: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.dataService.usersOne(_id).subscribe(res => {
                if (res.statusCode === 200) {                    
                    let user: User = new User().build(res.data);
                    user.__loadedat = new Date().getTime();                    
                    let olduser: User | null = this.xl.find(x => x._id === _id) || null;
                    
                    if (olduser) {                        
                        olduser = user;
                    } else {
                        this.xl.push(user);
                    }
                    
                    resolve(user);                
                }  else {                        
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }
}
