import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './cache.interceptor';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
    imports: [BrowserTransferStateModule],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}
    ],  
})
export class CacheModule {}
