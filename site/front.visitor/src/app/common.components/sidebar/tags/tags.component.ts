import { Component, OnInit } from "@angular/core";

import { TagRepository } from '../../../services/repositories/tag.repository';
import { AppService } from '../../../services/app.service';
import { Tag } from '../../../model/orm/tag.model';
import { Lang } from '../../../model/orm/lang.model';

@Component({
    selector: "tags",
    templateUrl: "./tags.component.html",
    styleUrls: ["./tags.component.scss"],
})
export class TagsComponent implements OnInit {
    public ready: boolean = false;

    constructor(
        private tagRepository: TagRepository,        
        private appService: AppService,        
    ) {}

    get currentLang(): Lang {return this.appService.currentLang.value;}
    get tags(): Tag[] {return this.tagRepository.xl;}

    public async ngOnInit(): Promise<void> {
        try {
            await this.tagRepository.load();
            this.ready = true;
        } catch (err) {
            this.appService.showNotification(err, "error");
        }
    }    
}
