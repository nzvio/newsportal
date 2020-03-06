import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnInit } from "@angular/core";
import { IAnswer } from 'src/app/model/answer.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: "answer-monitor",
    templateUrl: "./answermonitor.component.html",
    styleUrls: ["./answermonitor.component.scss"],
})
export class AnswerMonitorComponent implements AfterViewInit, OnInit {
    @Input() inputAnswer: BehaviorSubject<IAnswer<string>>;
    @Input() reset: BehaviorSubject<boolean>;
    public log: string = "";
    @ViewChild("monitor", {static: false}) monitorRef: ElementRef;
    private monitor: HTMLElement | null = null;

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.monitor = this.monitorRef.nativeElement;
        }, 1);
    }
    
    public ngOnInit(): void {
        this.reset.subscribe(reset => reset ? this.log = "" : null);
        this.inputAnswer.subscribe(answer => answer ? this.buildLog(answer) : null);
    }

    private buildLog(answer: IAnswer<string>): void {
        switch (answer.statusCode) {
            case 200:
                this.log += `> <span class='done'>${answer.data}</span><br>`;
                break;
            case 500:
                this.log += `> <span class='error'>${answer.error}</span><br>`;
                break;
            case 199:
                this.log += `> <span class='warning'>${answer.error}</span><br>`;
                break;
            default:
                this.log += `> ${answer.data}<br>`;
                break;
        }

        if (this.monitor) {
            setTimeout(() => {this.monitor.scrollTop = this.monitor.scrollHeight}, 1);            
        }
    }
}
