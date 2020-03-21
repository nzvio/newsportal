import { Controller, Post, UseGuards, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';
import { IAnswer } from "../../model/answer.interface";
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from "fs";
import { IImagable } from "../../model/imagable.interface";

@Controller('api/visitor/files')
export class FilesController 
{
    constructor (private filesService: FilesService) {}

    // upload file - NOT READY
    @Post("upload")
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    public upload(@UploadedFile() file): Promise<IAnswer<string>> {
        return this.filesService.upload (file);
    }

    // upload image
    @Post("img/upload")
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage({
            destination: (req, file, cb) => {                
                const subdir = (new Date ()).getFullYear () + "-" + ((new Date ()).getMonth () + 1);
                const fullDir = `../static/assets/images/${req.body.dir}/${subdir}`;
                if (!fs.existsSync (fullDir)) fs.mkdirSync (fullDir);
                cb(null, fullDir);
            },
            filename: (req, file, cb) => {
                const newfilename: string = Math.round(+new Date()/1000).toString ();                
                return cb(null, `${newfilename}${extname(file.originalname)}`)
            }
        })
    }))
    @UseGuards(AuthGuard)
    public uploadImg(@UploadedFile() file): Promise<IAnswer<IImagable>> {
        return this.filesService.uploadImg (file);
    }

    // upload image and create small copy
    @Post("img/uploadwithcopy/:width")
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage({
            destination: (req, file, cb) => {                
                const subdir = (new Date ()).getFullYear () + "-" + ((new Date ()).getMonth () + 1);
                const fullDir = `../static/assets/images/${req.body.dir}/${subdir}`;
                if (!fs.existsSync (fullDir)) fs.mkdirSync (fullDir);                
                cb(null, fullDir);
            },
            filename: (req, file, cb) => {
                const newfilename: string = Math.round(+new Date()/1000).toString ();                
                return cb(null, `${newfilename}${extname(file.originalname)}`);
            }
        }),        
    }))
    @UseGuards(AuthGuard)
    public uploadImgWithCopy(@UploadedFile() file, @Param("width") width: string): Promise<IAnswer<IImagable>> {        
        return this.filesService.uploadImg (file, width);
    }
}
