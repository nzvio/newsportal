export class UserDTO {    
    public readonly _id: string;
    public readonly name: string;    
    public readonly email: string;
    public password: string;
    public readonly img: string;
    public readonly img_s: string;    
    public readonly active: boolean;    
    public readonly usergroup: string;
    
    public readonly __articlesq: number;
    public readonly __commentsq: number;
    public readonly __createdat: string;
    public readonly __rating: number;
    public readonly __votesq: number;    
}
