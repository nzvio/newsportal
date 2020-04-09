import { Component, OnInit } from "@angular/core";

import { AppService } from '../../../services/app.service';

@Component({
    selector: "articles-per-category",
    templateUrl: "./apc.component.html",
    styleUrls: ["./apc.component.scss"]
})
export class ApcComponent implements OnInit {
    public ready: boolean = false;

    constructor(private appService: AppService) {}

    public ngOnInit(): void {
        setTimeout(async () => {
            try {                


                
                this.ready = true;
            } catch (err) {
                this.appService.monitorLog(err, true);
            }            
        }, 1500);
    }
}
