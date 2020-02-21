import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    public monitorContent: string = "";
    public mmActive: boolean = false;    
    
    public monitorLog(s: string, error: boolean = false): void {
        let classSt: string = error ? "class='error'" : "";
        let date: Date = new Date();
        this.monitorContent += `> ${this.twoDigits(date.getHours())}:${this.twoDigits(date.getMinutes())}:${this.twoDigits(date.getSeconds())} <span ${classSt}>${s}</span><br>`;
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
}
