import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { TargetRepository } from '../../../services/repositories/target.repository';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { Target } from '../../../model/target.model';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { DonorRepository } from '../../../services/repositories/donor.repository';
import { CategoryRepository } from '../../../services/repositories/category.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { Donor } from '../../../model/donor.model';
import { Category } from '../../../model/category.model';
import { Lang } from '../../../model/lang.model';
import { SocketService } from 'src/app/services/socket.service';
import { IAnswer } from 'src/app/model/answer.interface';

@Component({
	selector: 'targets-list-page',
	templateUrl: './targets.list.page.html',	
})
export class TargetsListPage extends ListPage<Target> implements OnInit, OnDestroy {
    // inherited
    public homeUrl: string = "/parsing/targets";
    // local
    public selectedLang: Lang | null = null;
    public tab: number = 1;
    public log: string = "";
    public executing: boolean = false;
    @ViewChild("monitor", {static: false}) monitorRef: ElementRef;
    private monitor: HTMLElement | null = null;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected targetRepository: TargetRepository,
        private donorRepository: DonorRepository,
        private categoryRepository: CategoryRepository,
        private langRepository: LangRepository,
        protected appService: AppService,        
        private socketService: SocketService,
    ) {      
        super(admlangRepository, targetRepository, appService);
    }    

    get dl(): Donor[] {return this.donorRepository.xlFull;}
    get cl(): Category[] {return this.categoryRepository.xlFull;}
    get ll(): Lang[] {return this.langRepository.xlFull;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.targetRepository.loadChunk();
            await this.donorRepository.loadFull();
            await this.categoryRepository.loadFull();
            await this.langRepository.loadFull();

            if (this.ll.length) {
                this.selectedLang = this.ll[0];
                this.appService.monitorLog("[targets] page loaded");    
                this.initSocket();
                this.ready = true;
            } else {
                this.appService.monitorLog("no languages found", true);
            }
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    } 
    
    public ngOnDestroy(): void {
        this.socketService.disconnect();
    }

    private initSocket(): void {
        this.socketService.connect();

        this.socketService.on<string>("targetExecuting").subscribe(res => {
            this.executing = true;
            this.monitorLog(res);
        }, err => console.log(err));

        this.socketService.on<string>("targetExecuted").subscribe(res => {
            this.executing = false;
            this.monitorLog(res);
        }, err => console.log(err));
    }
    
    public initMonitor(): void {
        if (!this.monitor) {
            setTimeout(() => {
                this.monitor = this.monitorRef.nativeElement;
            }, 1);
        }
    }

    private monitorLog(res: IAnswer<string>): void {
        this.log += res.statusCode === 200 ? `> ${res.data}<br>` : `> <span class='error'>${res.error}</span><br>`;
        
        if (this.monitor) {
            setTimeout(() => {this.monitor.scrollTop = this.monitor.scrollHeight}, 1);            
        }        
    }

    public execute(): void {        
        this.log = "";
        this.socketService.emit<null, string>("executeAllTargets").subscribe(
            res => this.appService.monitorLog(res.data),
            err => console.log(err));
    }
}
