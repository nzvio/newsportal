import { Repository } from '../services/repositories/repository';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { Model } from '../model/model';
import { UploadService } from '../services/upload.service';
import { IHTMLInputEvent } from '../model/htmlinputevent.interface';
import { HttpEventType } from '@angular/common/http';
import { IAnswer } from '../model/answer.interface';
import { IImagable } from '../model/imagable.interface';
import { ModulePage } from './_module.page';
import { AdmLangRepository } from '../services/repositories/admlang.repository';

export abstract class ObjectPage<T extends Model> extends ModulePage {
    public ready: boolean = false;
    public reloading: boolean = false;      
    public progressImg: number = 0;
    public imgCopyWidth: number = 100;
    public requiredFields: string[] = [];

    public abstract x: T & IImagable;
    public abstract homeUrl: string;
	public abstract folder: string | null;    
    
    constructor(        
        protected admlangRepository: AdmLangRepository,
        protected repository: Repository<any>,
        protected appService: AppService,
        protected router: Router,
        protected uploadService?: UploadService,
    ) {
        super(admlangRepository);
    }

    public async create(): Promise<boolean> {
		try {
			this.reloading = true;
			this.appService.monitorLog(`creating object...`);
			await this.repository.create(this.x);
			this.appService.monitorLog(`object created`);
            this.repository.invalidateAll();
            setTimeout(() => {
                this.reloading = false;
                this.router.navigateByUrl(this.homeUrl);			
            }, 500);	
            
            return true;
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            setTimeout(() => {this.reloading = false;}, 500);    

            return false;
		}
    }
    
    public async update(): Promise<boolean> {
		try {
			this.reloading = true;
			this.appService.monitorLog(`updating object...`);
			await this.repository.update(this.x);
			this.appService.monitorLog(`object updated`);
            this.repository.invalidateAll();
            setTimeout(() => {
                this.reloading = false;
                this.router.navigateByUrl(this.homeUrl);			
            }, 500);
            
            return true;
		} catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            setTimeout(() => {this.reloading = false;}, 500);    

            return  false;
		}
    }

    public uploadImg(event: IHTMLInputEvent): void {
        this.progressImg = 0;
        let fileToUpload: File = <File>event.target.files[0];        
        
        if (fileToUpload && this.folder) {
            let fd: FormData = new FormData ();
            fd.append ("dir", this.folder);
            fd.append ("img", fileToUpload, fileToUpload.name);
            this.appService.monitorLog(`uploading image ${fileToUpload.name}...`);
            this.uploadService.uploadImgWithCopy (fd, this.imgCopyWidth).subscribe (event => {                
                if (event.type == HttpEventType.UploadProgress) {
                    this.progressImg = Math.round (100 * event.loaded / event.total);                    
                } else if (event.type == HttpEventType.Response) {
                    const res: IAnswer<IImagable> = event.body;
    
                    if (res.statusCode === 200) {                        
                        this.appService.monitorLog(`uploaded: ${res.data.img}, ${res.data.img_s}`);
                        this.x.img = res.data.img;
                        this.x.img_s = res.data.img_s; 
                    } else {
                        this.appService.monitorLog (res.error, true);
                    }                    
                }                
            }, err => {
                this.appService.monitorLog (err.message, true);
            });            
        }  
    }

    public uploadImgTiny (editor: any): void {        
        let input: HTMLInputElement = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = () => {                
            let fileToUpload = <File>input.files[0];

            if (fileToUpload && this.folder) {
                let fd = new FormData ();
                fd.append ("dir", this.folder);
                fd.append ("img", fileToUpload, fileToUpload.name);
                this.appService.monitorLog(`uploading image ${fileToUpload.name}...`);
                this.uploadService.uploadImg(fd).subscribe (event => {  
                    if (event.type == HttpEventType.UploadProgress) {
                        // TODO: show upload progress
                    } else if (event.type == HttpEventType.Response) {
                        const res: IAnswer<IImagable> = event.body;
                            
                        if (res.statusCode === 200) {
                            editor.windowManager.close ();
                            editor.editorManager.activeEditor.insertContent(`<img src="/assets/images/${this.folder}/${res.data.img}" width="200">`);                            
                            this.appService.monitorLog(`uploaded: ${res.data.img}`);
                        } else {
                            this.appService.monitorLog (res.error, true);
                        } 
                    }                                               
                });                                
            }                
        };
        input.click ();
    } 

    public deleteImg(): void {
        this.x.img = null;
        this.x.img_s = null;
        this.progressImg = 0;
    }
}
