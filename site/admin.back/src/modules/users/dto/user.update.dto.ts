export class UserUpdateDTO {    
    public readonly _id: string;
    public readonly name: string;
    public readonly email: string;
    public password: string; // not readonly because we will encode it before updating
    public readonly img: string;
    public readonly img_s: string;
    public readonly active: boolean;
    public readonly usergroup: string;    
}
