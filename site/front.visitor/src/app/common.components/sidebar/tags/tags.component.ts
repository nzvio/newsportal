import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { TagRepository } from '../../../services/repositories/tag.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
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
        private langRepository: LangRepository,
        private appService: AppService,
        private router: Router,
    ) {}

    get currentLang(): Lang {return this.langRepository.current.value;}
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
