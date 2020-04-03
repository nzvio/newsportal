import { Injectable } from "@nestjs/common";

@Injectable()
export class SlugService {
    private in_str: string = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяєіїґ/ ,.!?()\"-&*:\\'—";
    private out_str: string[] = ['a','b','v','g','d','e','yo','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','h','ts','ch','sh','sch','','y','','e','yu','ya','e','i','yi','g','','-','','','','','','','','','','','','','',''];        

    public buildSlug (input: string): string
    {
        let slug: string = "";
        
        if (input) {
            
            input = String(input).toLowerCase ();
        
            for (let i: number = 0, l: number = input.length; i < l; i++) {
                let s: string = input.charAt(i); 
                let n: number = this.in_str.indexOf (s);
                slug += (n >= 0) ? this.out_str[n] : s;                
            }            
        }
        
        return slug;
    }
}
