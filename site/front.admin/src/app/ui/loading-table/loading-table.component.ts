import { Component, AfterViewInit, Input } from "@angular/core";

@Component({
    selector: "loading-table",
    templateUrl: "./loading-table.component.html",
    styleUrls: ["./loading-table.component.scss"]
})
export class LoadingtableComponent implements AfterViewInit {    
    @Input() columns: number = 2;
    public visible: boolean = false;
    
    public ngAfterViewInit(): void {                
        setTimeout(() => {
            this.visible = true;
        }, 1);        
    }
}
