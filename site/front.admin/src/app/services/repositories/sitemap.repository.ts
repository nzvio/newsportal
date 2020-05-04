import { Injectable } from "@angular/core";
import { DataService } from '../data.service';

@Injectable()
export class SitemapRepository {
    public data: string = "";

    constructor(private dataService: DataService) {}

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.sitemapLoad().subscribe(res => {
                if (res.statusCode === 200) {
                    this.data = res.data;
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public save(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.sitemapSave(this.data).subscribe(res => {
                res.statusCode === 200 ? resolve() : reject(res.error);                
            }, err => {
                reject(err.message);
            });
        });
    }

    public build(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.sitemapBuild().subscribe(res => {
                if (res.statusCode === 200) {
                    this.data = res.data;
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }
}
