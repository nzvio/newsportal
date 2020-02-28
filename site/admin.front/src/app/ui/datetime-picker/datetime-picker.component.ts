import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { IDtpDay } from './dtpday.interface';
import { IDtpLang } from './dtplang.interface';
import { dtpLangs } from './datetime-picker.constants';

@Component({
    selector: "datetime-picker",
    templateUrl: "./datetime-picker.component.html",
    styleUrls: ["./datetime-picker.component.scss"],
})
export class DatetimePicker implements OnInit {
    @Input() value: Date = new Date();
    @Input() langName: string = "en";
    @Output() valueChange: EventEmitter<Date> = new EventEmitter();  
    public currentLang: IDtpLang | null = null;  
    public ready: boolean = false;
    public active: boolean = false;    
    public days: IDtpDay[] = []; // will select
    private year: number; // will select
    private month: number; // will select
    private currentYear: number; // now selected
    private currentMonth: number; // now selected
    private currentDay: number; // now selected
    public currentHour: number; // now selected
    public currentMinute: number; // now selected

    get formatedDate(): string {return `${this.twoDigits(this.value.getUTCDate())}.${this.twoDigits(this.value.getUTCMonth()+1)}.${this.value.getUTCFullYear()} ${this.twoDigits(this.value.getUTCHours())}:${this.twoDigits(this.value.getUTCMinutes())}`;}
    get monthAndYear(): string {return `${this.twoDigits(this.month+1)}.${this.year}`;}    

    public ngOnInit(): void { 
        this.currentLang = dtpLangs.find(l => l.name === this.langName) || null;

        if (this.currentLang) {
            this.init();
            this.ready = true;
        } else {
            console.log("no lang found");
        }        
    }

    public toggleActive(): void {
        if (this.active) {
            this.active = false;
        } else {
            this.init();
            this.active = true;
        }
    }

    private init(): void {
        this.year = this.currentYear = this.value.getUTCFullYear();
        this.month = this.currentMonth = this.value.getUTCMonth();
        this.currentDay = this.value.getUTCDate();
        this.currentHour = this.value.getUTCHours();
        this.currentMinute = this.value.getUTCMinutes();
        this.buildDays();        
    }

    private buildDays(): void {
        let firstDayOfMonth: number = new Date(this.year, this.month).getDay() - 1;
        (firstDayOfMonth === -1) ? firstDayOfMonth = 6 : null;
        let daysInMonth: number = 32 - new Date(this.year, this.month, 32).getDate();        
        this.days = [];

        for (let i: number = 0; i < firstDayOfMonth; i++) {
            let day: IDtpDay = {hidden: true};
            this.days.push(day);
        }

        for (let i: number = 0; i < daysInMonth; i++) {
            let day: IDtpDay = {n: i+1};

            if (i+1 === this.currentDay && this.month === this.currentMonth && this.year === this.currentYear) {
                day.current = true;
            }

            this.days.push(day);
            let index: number = firstDayOfMonth + i + 1;

            if (!(index % 7) || !((index+1) % 7)) {
                day.holiday = true;
            }            
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

    public getDayClass(day: IDtpDay): string {
        let c: string = "day";
        c += day.hidden ? " hidden" : "";
        c += day.holiday ? " holiday" : "";
        c += day.current ? " current" : "";

        return c;
    }

    public setDate(day: IDtpDay): void {
        if (day.n) {
            this.currentDay = day.n;
            this.currentMonth = this.month;
            this.currentYear = this.year;
        }

        this.buildDays();
    }

    public apply(): void {
        this.valueChange.emit(new Date(Date.UTC(this.currentYear, this.currentMonth, this.currentDay, this.currentHour, this.currentMinute)));
        this.active = false;
    }

    public onKeyDown(event: KeyboardEvent): boolean | void {
        if (event.keyCode === 13) {
            this.apply();
            return false;
        }
    }
}
