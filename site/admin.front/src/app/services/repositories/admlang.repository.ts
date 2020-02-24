import { Injectable } from "@angular/core";
import { DataService } from '../data.service';
import { AdmLang } from '../../model/admlang.model';

@Injectable()
export class AdmLangRepository {
    private currentLangName: string | null = null;
    public langs: AdmLang[] = [];
    public currentLang: AdmLang | null = null;
    
    constructor(private dataService: DataService) {
        let langName: string = localStorage.getItem("lang");
        this.currentLangName = langName ? langName : null;
    }

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.admlangs().subscribe(res => {
                if (res.length) {
                    this.langs = res.map(r => new AdmLang().build(r));

                    if (this.currentLangName) {
                        this.currentLang = this.langs.find(l => l.name === this.currentLangName);
                    } else {
                        this.currentLang = this.langs[0];
                        this.currentLangName = this.currentLang.name;
                        this.save();
                    }

                    resolve();
                } else {
                    reject("No langs");
                }                
            }, err => {
                reject(err);
            });
        });
    }

    public save(): void {
        localStorage.setItem("lang", this.currentLangName);
    }
}
