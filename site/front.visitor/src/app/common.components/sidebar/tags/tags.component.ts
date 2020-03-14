import { Component, OnInit } from "@angular/core";

import { TagRepository } from '../../../services/repositories/tag.repository';
import { LangRepository } from '../../../services/repositories/lang.repository';
import { AppService } from '../../../services/app.service';
import { Tag } from '../../../model/orm/tag.model';

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
    ) {}

    get tags(): Tag[] {return this.tagRepository.xl.filter(x => x.lang === this.langRepository.current.value._id);}

    public async ngOnInit(): Promise<void> {
        try {
            await this.tagRepository.load();
            this.ready = true;
        } catch (err) {
            this.appService.showNotification(err, "error");
        }
    }
}
