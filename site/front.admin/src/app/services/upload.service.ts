import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";

import { IAnswer } from '../model/answer.interface';
import { IImagable } from '../model/imagable.interface';
import { DataService } from './data.service';

@Injectable()
export class UploadService {
    constructor(private dataService: DataService) {}

    public uploadImg (fd: FormData): Observable<HttpEvent<IAnswer<IImagable>>> {return this.dataService.uploadImg (fd);}
    public uploadImgWithCopy (fd: FormData, width: number): Observable<HttpEvent<IAnswer<IImagable>>> {return this.dataService.uploadImgWithCopy (fd, width);}
}
