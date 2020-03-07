export class Model {
    public _id: string;    
    public defended: boolean;
    
    public build (o: Object): any {
        for (let field in o) {
            if (field === "date") {
                this[field] = new Date (o[field]);
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }

    protected twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }
}
