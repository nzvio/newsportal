import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from '@angular/router';
import { Lang } from '../../../model/orm/lang.model';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/orm/user.model';
import { UserRepository } from '../../../services/repositories/user.repository';
import { IHTMLInputEvent } from '../../../model/htmlinputevent.interface';
import { UploadService } from '../../../services/upload.service';
import { HttpEventType } from '@angular/common/http';
import { IAnswer } from '../../../model/answer.interface';
import { IImagable } from '../../../model/imagable.interface';

@Component({
    selector: "user-private-page",
    templateUrl: "./user.private.page.html",
    styleUrls: ["../user.forms.scss", "./user.private.page.scss"],
})
export class UserPrivatePage implements OnInit {        
    public tab: number = 1;
    public loading: boolean = false;
    public errorName: boolean = false;
    public errorEmail: boolean = false;
    public uploadProgress: number = 0;
    public dropAreaActive: boolean = false;
    private maxFileSize: number = 5 * 1024 * 1024; // 5Mb

    constructor(        
        private route: ActivatedRoute,
        private appService: AppService,
        private authService: AuthService,
        private userRepository: UserRepository,
        private uploadService: UploadService,
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}
    get user(): User {return this.authService.authData.user;}

    public ngOnInit(): void {
        this.route.params.subscribe(() => {            
            this.appService.setTitle(this.currentLang.s("user-private"));                   
        });
    }    

    private validate(): boolean {
        let error: boolean = false;
        this.user.name = this.user.name.trim();
        this.user.email = this.user.email.trim();

        if (!this.user.email || !this.appService.validateEmail(this.user.email)) {
            this.errorEmail = true;
            error = true;
        } else {
            this.errorEmail = false;
        }

        if (!this.user.name) {
            this.errorName = true;
            error = true;
        } else {
            this.errorName = false;
        }

        return !error;
    } 
    
    public async update(): Promise<void> {
        if (!this.validate()) {
            return;
        }

        try {
            this.loading = true;
            await this.userRepository.update(this.user);
            delete this.user.password;
            this.authService.save();
            this.loading = false;       
            this.appService.showNotification(this.currentLang.s("user-private-saved"));
        } catch (err) {
            String(err).includes("E11000") ? err = this.currentLang.s("user-private-duplicateemail") : null;
            this.appService.showNotification(err, "error");            
            this.loading = false;
        }
    }

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
