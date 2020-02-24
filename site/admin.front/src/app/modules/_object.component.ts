import { Input, Output, EventEmitter } from '@angular/core';

import { IHTMLInputEvent } from '../model/htmlinputevent.interface';
import { AdmLang } from '../model/admlang.model';

export abstract class ObjectComponent {
    @Input() currentLang: AdmLang;
    @Input() requiredFields: string[] = [];
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

    public isRequired(field: string): boolean {
        return this.requiredFields.includes(field);
    }
}
