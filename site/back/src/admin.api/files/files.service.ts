import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

import { IAnswer } from "../../interfaces/answer.interface";
import { IImagable } from 'src/interfaces/imagable.interface';

@Injectable()
export class FilesService 
{
    public async upload (file): Promise<IAnswer<string>> {        
        return {statusCode: 415, data: "Method not ready, dir will be here in future"};
    }

    public async uploadImg (file, width: string | null = null): Promise<IAnswer<IImagable>>
    {
        console.log("img saved to " + file.filename);  
        const subdir = (new Date ()).getFullYear () + "-" + ((new Date ()).getMonth () + 1);

        if (width) {            
            const fnameParts = file.filename.split (".");
            const file2name = fnameParts[0]+"_s."+fnameParts[1];
    
            try {
                await sharp (file.path).resize(parseInt (width)).toFile(`${file.destination}/${file2name}`);
                return {statusCode: 200, data: {img: `${subdir}/${file.filename}`, img_s: `${subdir}/${file2name}`}};
            } catch (err) {
                let errTxt: string = `Error in FilesService.uploadImg: ${String(err)}`;
                console.log(errTxt);
                return {statusCode: 500, error: errTxt};
            }                     
        } else {
            return {statusCode: 200, data: {img: `${subdir}/${file.filename}`}};
        }       
    }      
}
