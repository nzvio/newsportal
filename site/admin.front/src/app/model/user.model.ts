import { Model } from './model';

export class User extends Model {    
    public _id: string;
    public name: string;
    public email: string;
    public password: string;
    public img: string;
    public img_s: string;
    public active: boolean;
    public usergroup: string;
    public defended: boolean;

    public init(): User {
        this.name = "";
        this.email = "";
        this.active = true;
        this.usergroup = "default";
        
        return this;
    }
}
