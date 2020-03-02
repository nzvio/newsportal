import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Category } from '../../model/category.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/lang.model';
import { Target } from '../../model/target.model';
import { Donor } from '../../model/donor.model';
import { SocketService } from '../../services/socket.service';
import { IAnswer } from '../../model/answer.interface';

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
    ) {
        super();        
    }
    
    public ngOnInit(): void {
        this.selectedLang = this.ll[0];        
        
        if (this.canExecute) {
            this.socketService.connect();
        }       

        this.socketService.on<IAnswer<string>>("targetExecuting").subscribe(res => {
            this.executing = true;
            this.consoleLog(`${res.statusCode} ${res.data}`);
        });

        this.socketService.on<IAnswer<string>>("targetExecuted").subscribe(res => {
            this.executing = false;
            this.consoleLog(`${res.statusCode} ${res.data}`);
        });
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
        this.consoleLog(`executeTarget ${this.x._id}`);
        this.socketService.emit<string, IAnswer<string>>("executeTarget", this.x._id).subscribe(res => {
            this.consoleLog(`${res.statusCode} ${res.data}`);
        });
    }

    private consoleLog(s: string): void {
        this.log += `> ${s}<br>`;
        
        if (this.monitor) {
            setTimeout(() => {this.monitor.scrollTop = this.monitor.scrollHeight}, 1);            
        }        
    }
}
