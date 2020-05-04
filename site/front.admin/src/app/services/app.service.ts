import { Injectable } from "@angular/core";

import { Childable } from '../model/childable.interface';
import { URL } from '../model/url';

@Injectable()
export class AppService {
    public monitorContent: string = "";
    public mmActive: boolean = false;   
    public currentUrl: URL = new URL();
    
    constructor() {}
    
    public monitorLog(s: string, error: boolean = false): void {
        let classSt: string = error ? "class='error'" : "";
        let date: Date = new Date();
        setTimeout(() => {
            this.monitorContent += `> ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}:${this.twoDigits(date.getSeconds())} <span ${classSt}>${s}</span><br>`;
        }, 1);        
    }
    
    public twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    public smoothScroll (from: number, to: number, duration: number, element: HTMLElement): void {		
		let change: number = to - from;
        let currentTime: number = 0;
		let increment: number = 10;		
        let animateScroll = () => {        
                currentTime += increment;
                let val: number = this.easeInOutQuad(currentTime, from, change, duration);
                element.scrollTo(0, val);
                
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }                
        	};

        animateScroll();
	}

	private easeInOutQuad (t:number, b:number, c:number, d:number): number {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
    
    public validateEmail (email: string): boolean {
        const re: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test (email.toLowerCase());
    }  
    
    public sort(arr: any[], by: string = "pos", dir: number = 1): void {
        if (arr && arr.length) {
            arr.sort((a: any, b: any) => {
                let x: any = (typeof(a[by]) === "string") ? (a[by] as string).toLowerCase() : a[by];
                let y: any = (typeof(b[by]) === "string") ? (b[by] as string).toLowerCase() : b[by];
                                
                if (dir === 1) {
                    if (x > y) return 1;
                    if (x < y) return -1;                    
                    return 0;
                } else if (dir === -1) {
                    if (x < y) return 1;
                    if (x > y) return -1;
                    return 0;
                }

                return 0;
            });
        }
    }

    public tree2list(tree: Childable[]): Childable[] {
        let list: Childable[] = [];
        let buildChildren = (children: Childable[], level: number) => {            
            let res: Childable[] = [];
            
            children.forEach(child => {
                child.__level = level;
                child.__shift = "";

                for (let i: number = 0; i < level; i++) {
                    child.__shift += "&nbsp;&nbsp;&nbsp;";
                }

                res.push(child);
                res = res.concat(buildChildren(child.__children, level+1));
            });           
            
            return res;
        };

        tree.forEach(page => {
            list.push(page);
            list = list.concat(buildChildren(page.__children, 1));
        });

        return list;
    }    
}
