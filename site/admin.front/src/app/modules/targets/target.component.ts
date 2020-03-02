import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { Category } from '../../model/category.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';
import { Target } from '../../model/target.model';
import { Donor } from '../../model/donor.model';
import { SocketService } from '../../services/socket.service';
import { IAnswer } from '../../model/answer.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
    selector: "the-target",
    templateUrl: "./target.component.html"
})
export class TargetComponent extends ObjectComponent implements OnInit, OnDestroy {    
    @Input() x: Target;   
    @Input() ll: Lang[]; 
    @Input() cl: Category[];    
    @Input() dl: Donor[];    
    @Input() canExecute: boolean = false;
    public tab: number = 1;     
    public selectedLang: Lang;  
    public log: string = "";
    @ViewChild("monitor", {static: false}) monitorRef: ElementRef;
    private monitor: HTMLElement | null = null;
    public executing: boolean = false;
    
    constructor(
        private socketService: SocketService,  
        private appService: AppService,      
    ) {
        super();        
    }
    
    public ngOnInit(): void {
        this.selectedLang = this.ll[0];        
        
        if (this.canExecute) {
            this.socketService.connect();
        }       

        this.socketService.on<string>("targetExecuting").subscribe(res => {
            this.executing = true;
            this.monitorLog(res);
        }, err => console.log(err));

        this.socketService.on<string>("targetExecuted").subscribe(res => {
            this.executing = false;
            this.monitorLog(res);
        }, err => console.log(err));
    }    

    public ngOnDestroy(): void {        
        this.canExecute ? this.socketService.disconnect() : null;        
    }

    public initMonitor(): void {
        if (!this.monitor) {
            setTimeout(() => {
                this.monitor = this.monitorRef.nativeElement;
            }, 1);
        }
    }

    public execute(): void {        
        this.log = "";
        this.socketService.emit<string, string>("executeTarget", this.x._id).subscribe(
            res => this.appService.monitorLog(res.data),
            err => console.log(err));
    }

    private monitorLog(res: IAnswer<string>): void {
        this.log += res.statusCode === 200 ? `> ${res.data}<br>` : `> <span class='error'>${res.error}</span><br>`;
        
        if (this.monitor) {
            setTimeout(() => {this.monitor.scrollTop = this.monitor.scrollHeight}, 1);            
        }        
    }
}
