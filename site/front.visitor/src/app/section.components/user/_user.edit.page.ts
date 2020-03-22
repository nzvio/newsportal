import { HttpEventType } from '@angular/common/http';

import { User } from '../../model/orm/user.model';
import { IHTMLInputEvent } from '../../model/htmlinputevent.interface';
import { UploadService } from '../../services/upload.service';
import { AppService } from '../../services/app.service';
import { Lang } from '../../model/orm/lang.model';
import { IImagable } from '../../model/imagable.interface';
import { IAnswer } from '../../model/answer.interface';

export abstract class UserEditPage {
    public abstract user: User;
    protected abstract uploadService: UploadService;
    protected abstract appService: AppService; 

    protected maxFileSize: number = 5 * 1024 * 1024; // 5Mb
    public uploadProgress: number = 0;
    public dropAreaActive: boolean = false;    

    get currentLang(): Lang {return this.appService.currentLang.value;}

    public openFileDialog(): void {
        let input: HTMLInputElement = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";        
        input.onchange = (event: IHTMLInputEvent) => {
            const file: File = event.target.files[0];
            
            if (file) {
                if (file.size > this.maxFileSize) {
                    this.appService.showNotification(this.currentLang.s("user-private-imglimit"), "error");
                } else {
                    this.upload(file);            
                }
            }            
        };
        input.click();
    }

    private upload(file: File): void {
        this.uploadProgress = 0;
        const fd: FormData = new FormData ();
        fd.append ("dir", "users");
        fd.append ("img", file, file.name);
        this.appService.showNotification(`${this.currentLang.s("user-private-uploading")} ${file.name}...`);
        this.uploadService.uploadImgWithCopy (fd, 150).subscribe (event => {                
            if (event.type == HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round (100 * event.loaded / event.total);                    
            } else if (event.type == HttpEventType.Response) {
                const res: IAnswer<IImagable> = event.body;

                if (res.statusCode === 200) {                        
                    this.appService.showNotification(this.currentLang.s("user-private-uploaded"));
                    this.user.img = res.data.img;
                    this.user.img_s = res.data.img_s;                     
                } else {
                    this.appService.showNotification(res.error, "error");
                }                    
            }                
        }, err => {
            this.appService.showNotification(err.message, "error");
        }); 
    }

    public onDrop(event: DragEvent): void {
        event.stopPropagation();
        event.preventDefault();        
        this.dropAreaActive = false;
        const file: File = event.dataTransfer.files[0];
        
        if (file.type.includes("image/")) {            
            if (file.size > this.maxFileSize) {
                this.appService.showNotification(this.currentLang.s("user-private-imglimit"), "error");
            } else {
                this.upload(file);
            }
        }                
    }
    
    public onDragOver(event: DragEvent): void {
        event.stopPropagation();
        event.preventDefault();
    }

    public onDragEnter(event: DragEvent) {
        event.stopPropagation();
        event.preventDefault();        
        this.dropAreaActive = true;
    }

    public onDragLeave(event: DragEvent) {
        event.stopPropagation();
        event.preventDefault();                
        this.dropAreaActive = false;        
    }
}