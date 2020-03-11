import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "image-viewer",
    templateUrl: "./imageviewer.component.html",
    styleUrls: ["./imageviewer.component.scss"],
})
export class ImageviewerComponent {
    @Input() img: string = "";
    @Input() folder: string = "";    
    @Input() active: boolean = false;
    @Output() activeChange: EventEmitter<boolean> = new EventEmitter();

    public close(): void {
        this.activeChange.emit(false);
    }
}
