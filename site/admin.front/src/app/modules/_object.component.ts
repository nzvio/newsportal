import { Input, Output, EventEmitter } from '@angular/core';

import { IHTMLInputEvent } from '../model/htmlinputevent.interface';
import { AdmLang } from '../model/admlang.model';
import { Lang } from '../model/lang.model';

export abstract class ObjectComponent {
    @Input() currentLang: AdmLang;
    @Input() requiredFields: string[] = [];
    @Input() progressImg: number = 0;    
    @Output() uploadImg: EventEmitter<Event> = new EventEmitter();
    @Output() deleteImg: EventEmitter<void> = new EventEmitter();
    @Output() uploadImgTiny: EventEmitter<object> = new EventEmitter();
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

    public tinyInit (lang: Lang): Object {
        let self = this;
        return {
            branding:false, 
            directionality: lang.dir,
            height:300, 
            width:"100%", 
            menubar:false, 
            plugins: ['image', 'code', 'table'], 
            toolbar: 'undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent code table image', 
            relative_urls: false,
            file_picker_callback: function () {
                self.uploadImgTiny.emit(this);                
			}
        };
    }
}
