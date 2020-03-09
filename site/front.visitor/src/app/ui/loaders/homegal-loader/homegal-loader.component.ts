import { Component, OnInit, Input, AfterViewInit } from "@angular/core";

@Component({
    selector: "homegal-loader",
    templateUrl: "./homegal-loader.component.html",
    styleUrls: ["./homegal-loader.component.scss"]
})
export class HomegalLoaderComponent implements OnInit, AfterViewInit {
    @Input() n: number = 1;
    public dummy: number[] = [];
    public loading: boolean = false;

    public ngOnInit(): void {
        for (let i: number = 0; i < this.n; i++) {
            this.dummy.push(i);
        }
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {this.loading = true}, 1);
    }
}
