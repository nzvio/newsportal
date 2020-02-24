export class Model {    
    // real data
    public _id: string;    
    public defended: boolean;
    // utils
    public selected: boolean = false;

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
}
