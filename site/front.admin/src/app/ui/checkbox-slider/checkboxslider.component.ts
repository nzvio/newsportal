import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: "checkbox-slider",
    templateUrl: "./checkboxslider.component.html",
    styleUrls: ["./checkboxslider.component.scss"]
})
export class CheckboxsliderComponent {    
    @Input() disabled: boolean = false;
    @Input() value: boolean = false;    
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter();
    
    get className(): string {return "chbs" + (this.value ? " active" : "") + (this.disabled ? " disabled" : "")}

    public onClick(): void {        
        if (!this.disabled) {
            this.valueChange.emit(!this.value);    
        }        
    }
}
