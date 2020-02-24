import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../model/user.model';
import { Usergroup } from '../../model/usergroup.model';
import { IHTMLInputEvent } from "../../model/htmlinputevent.interface";
import { AdmLang } from 'src/app/model/admlang.model';

@Component({
    selector: "the-user",
    templateUrl: "./user.component.html"
})
export class UserComponent {
    @Input() currentLang: AdmLang;
    @Input() x: User | null = null;
    @Input() ugl: Usergroup[] = [];
    @Input() progressImg: number = 0;
    @Output() uploadImg: EventEmitter<Event> = new EventEmitter();
    @Output() deleteImg: EventEmitter<void> = new EventEmitter();
    public viewerActive: boolean = false;

    public onUploadImg(event: IHTMLInputEvent): void {
        this.uploadImg.emit(event);
    }

    public onDeleteImg(): void {
        this.deleteImg.emit();
    }
}
