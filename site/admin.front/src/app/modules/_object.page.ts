import { Repository } from '../services/repositories/repository';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { Model } from '../model/model';

export abstract class ObjectPage {
    public ready: boolean = false;
    public reloading: boolean = false;      
    public x: Model;
    
    constructor(        
        protected repository: Repository<any>,
        protected appService: AppService,
        protected router: Router,
    ) {}

    public async create(): Promise<void> {
		try {
			this.reloading = true;
			this.appService.monitorLog(`creating object...`);
			await this.repository.create(this.x);
			this.appService.monitorLog(`object created`);
            this.repository.invalidateAll();
            setTimeout(() => {
                this.reloading = false;
                this.router.navigateByUrl("/users/usergroups");			
            }, 500);			
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            setTimeout(() => {this.reloading = false;}, 500);    
		}
    }
    
    public async update(): Promise<void> {
		try {
			this.reloading = true;
			this.appService.monitorLog(`updating object...`);
			await this.repository.update(this.x);
			this.appService.monitorLog(`object updated`);
            this.repository.invalidateAll();
            setTimeout(() => {
                this.reloading = false;
                this.router.navigateByUrl("/users/usergroups");			
            }, 500);			
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            setTimeout(() => {this.reloading = false;}, 500);    
		}
    }
}
