import { AppService } from '../services/app.service';
import { Repository } from '../services/repositories/repository';
import { Model } from '../model/model';
import { ModulePage } from './_module.page';
import { AdmLangRepository } from '../services/repositories/admlang.repository';

export abstract class ListPage<T extends Model> extends ModulePage {
    public ready: boolean = false;
    public reloading: boolean = false;    
    public allSelected: boolean = false;

    public abstract homeUrl: string;
    
    constructor(        
        protected admlangRepository: AdmLangRepository,
        protected repository: Repository<any>,
        protected appService: AppService,
    ) {
        super(admlangRepository);
    }

    get currentPart(): number {return this.repository.chunkCurrentPart;}
    set currentPart(v: number) {this.repository.chunkCurrentPart = v;}
    get sortBy(): string {return this.repository.chunkSortBy;}
    set sortBy(v: string) {this.repository.chunkSortBy = v;}
    get sortDir(): number {return this.repository.chunkSortDir;}
    set sortDir(v: number) {this.repository.chunkSortDir = v;}
    get xl(): T[] {return this.repository.xlChunk;}
    get length(): number {return this.repository.chunkLength;}
    get fullLength(): number {return this.repository.fullLength;}    
    get canDeleteBulk(): boolean {return !!this.xl.filter(x => x.__selected).length;}

    public async rebuildList(): Promise<void> {		        
        try {
            this.reloading = true;
            this.allSelected = false;
            this.repository.invalidateChunk();
            await this.repository.loadChunk();
            this.appService.monitorLog(`data reloaded, currentPart=${this.currentPart}, sortBy=${this.sortBy}, sortDir=${this.sortDir}`);
                    
            if (this.currentPart > 0 && this.currentPart > Math.ceil(this.fullLength / this.length) - 1) { // after deleting or filtering may be currentPart is out of possible diapason, then decrease and reload again            
                this.currentPart--;
                this.rebuildList();
            } else {
                setTimeout(() => {this.reloading = false;}, 500);        
            }       
        } catch (err) {
            this.appService.monitorLog(err, true);
            setTimeout(() => {this.reloading = false;}, 500);    
        }        
    } 

    public changeSorting(sortBy: string): void {
        if (this.sortBy === sortBy) {
            this.sortDir *= -1;
        } else {
            this.sortBy = sortBy;
            this.sortDir = 1;
        }

        this.rebuildList();
    }
    
    public async updateParam (_id: string, p: string, v: any): Promise<boolean> {        
        try {
            this.appService.monitorLog(`updating object: id=${_id} param=${p} value=${v}`);
            await this.repository.updateParam(_id, p, v);
            this.repository.invalidateAll();
            this.appService.monitorLog("ok");
            return true;
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            return false;
        }        
    }    
    
    // egoistic param - boolean that can be true only in one element, other must be false
    public async updateEgoisticParam (_id: string, p: string, v: boolean): Promise<boolean> {        
        try {
            if (v) {
                this.xl.filter(x => x._id !== _id).forEach(x => {
                    x[p] = false;
                });
            }            
            
            this.appService.monitorLog(`updating egoistic parameter: id=${_id} param=${p} value=${v}`);
            await this.repository.updateEgoisticParam(_id, p, v);
            this.repository.invalidateAll();
            this.appService.monitorLog("ok");
            return true;
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            return false;
        }        
    }

    public async delete(_id: string): Promise<boolean> {
        if (confirm("Are you sure?")) {
            this.appService.monitorLog(`deleting object: id=${_id}`);

            try {
                await this.repository.delete(_id);
                this.repository.invalidateAll();
                this.appService.monitorLog("ok");
                this.rebuildList();
                return true;
            } catch (err) {
                this.appService.monitorLog(`error: ${err}`, true);
                return false;
            }
        }        

        return false;
    }

    public async deleteBulk(): Promise<boolean> {
        if (this.canDeleteBulk && confirm("Are you sure?")) {
            let _ids: string[] = this.xl.filter(x => x.__selected).map(x => x._id);
            this.appService.monitorLog(`deleting multiple objects: id=${_ids.toString()}`);

            try {
                await this.repository.deleteBulk(_ids);
                this.repository.invalidateAll();
                this.appService.monitorLog("ok");
                this.rebuildList();
                return true;
            } catch (err) {
                this.appService.monitorLog(`error: ${err}`, true);
                return false;
            }
        }

        return false;
    }

    public onSelect(): void {
        let allSelected: boolean = true;

        for (let x of this.xl) {
            if (!x.__selected && !x.defended) {
                allSelected = false;
                break;
            }
        }
        
        this.allSelected = allSelected;
    }

    public onSelectAll(): void {
        this.xl.filter(x => !x.defended).forEach(x => {x.__selected = this.allSelected});
    }
}
