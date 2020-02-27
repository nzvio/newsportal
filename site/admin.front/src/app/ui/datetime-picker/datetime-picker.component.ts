import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
    selector: "datetime-picker",
    templateUrl: "./datetime-picker.component.html",
    styleUrls: ["./datetime-picker.component.scss"],
})
export class DatetimePicker implements OnInit {
    @Input() value: Date = new Date();
    @Output() valueChange: EventEmitter<Date> = new EventEmitter();
    public active: boolean = false;    
    public days: number[] = [];
    private year: number;
    private month: number;
    private day: number;

    get formatedDate(): string {return `${this.twoDigits(this.value.getUTCDate())}.${this.twoDigits(this.value.getUTCMonth()+1)}.${this.value.getUTCFullYear()} ${this.twoDigits(this.value.getUTCHours())}:${this.twoDigits(this.value.getUTCMinutes())}`;}
    get monthAndYear(): string {return `${this.twoDigits(this.month+1)}.${this.year}`;}    

    public ngOnInit(): void {       
        this.year = this.value.getUTCFullYear();
        this.month = this.value.getUTCMonth();
        this.day = this.value.getUTCDate();
        this.buildDays();        
    }

    private buildDays(): void {
        let firstDayOfMonth: number = new Date(this.year, this.month).getDay() - 1;
        (firstDayOfMonth === -1) ? firstDayOfMonth = 6 : null;
        let daysInMonth: number = 32 - new Date(this.year, this.month, 32).getDate();        
        this.days = [];

        for (let i: number = 0; i < firstDayOfMonth; i++) {
            this.days.push(null);
        }

        for (let i: number = 0; i < daysInMonth; i++) {
            this.days.push(i+1);
        }
    }

    private twoDigits(n: number): string {
        return (n < 10) ? `0${n}` : `${n}`;
    }

    public onMonthBack(): void {
        if (this.month === 0) {
            this.month = 11;
            this.year--;
        } else {
            this.month--;
        }

        this.buildDays();
    }

    public onMonthForward(): void {
        if (this.month === 11) {
            this.month = 0;
            this.year++;
        } else {
            this.month++;
        }

        this.buildDays();
    }
}
