import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Repository } from './repositories/repository';

@Injectable()
export class ErrorService {
    constructor(private router: Router) {}

    public processStatus(statusCode: number, repository: Repository<any>): void {
        if (statusCode === 403) {
            repository.invalidateChunk();
            repository.invalidateFull();
            this.router.navigateByUrl("/auth/logout");            
        }
    }
}
