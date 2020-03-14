import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Category } from '../../model/orm/category.model';
import { ObjectComponent } from '../_object.component';
import { Lang } from '../../model/orm/lang.model';
import { Target } from '../../model/orm/target.model';
import { Donor } from '../../model/orm/donor.model';
import { SocketService } from '../../services/socket.service';
import { IAnswer } from '../../model/answer.interface';
import { AppService } from 'src/app/services/app.service';
import { BehaviorSubject } from 'rxjs';
import { ParseerrorRepository } from '../../services/repositories/parseerror.repository';
import { ArticleRepository } from '../../services/repositories/article.repository';

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
    public executing: boolean = false;    
    public logAnswer: BehaviorSubject<IAnswer<string>> = new BehaviorSubject(null); // monitor
    public resetMonitor: BehaviorSubject<boolean> = new BehaviorSubject(false); // monitor
    
    constructor(
        private socketService: SocketService,  
        private appService: AppService,      
        private parseerrorRepository: ParseerrorRepository,
        private articleRepository: ArticleRepository,
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
            this.logAnswer.next(res);
        }, err => console.log(err));

        this.socketService.on<string>("targetExecuted").subscribe(res => {
            this.executing = false;
            this.logAnswer.next(res);
            this.parseerrorRepository.invalidateAll();
            this.articleRepository.invalidateAll();
        }, err => console.log(err));
    }    

    public ngOnDestroy(): void {        
        this.canExecute ? this.socketService.disconnect() : null;        
    }    

    public execute(): void {        
        this.resetMonitor.next(true);
        this.socketService.emit<string, string>("executeTarget", this.x._id).subscribe(
            res => this.appService.monitorLog(res.data),
            err => console.log(err));
    }    
}
