import { Input } from '@angular/core';

export abstract class ObjectComponent {
    @Input() requiredFields: string[] = [];

    public isRequired(field: string): boolean {
        return this.requiredFields.includes(field);
    }
}
