import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../model/user.model';
import { Usergroup } from '../../model/usergroup.model';
import { IHTMLInputEvent } from "../../model/htmlinputevent.interface";

@Component({
    selector: "the-user",
    templateUrl: "./user.component.html"
})
export class UserComponent {
    @Input() x: User | null = null;
    @Input() ugl: Usergroup[] = [];
    @Input() progressImg: number = 0;
    @Output() uploadImg: EventEmitter<Event> = new EventEmitter();

    public handleUploadImg(event: IHTMLInputEvent): void {
        this.uploadImg.emit(event);
    }
}
