import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MonitoringService } from './monitoring.service';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }
    handleError(error: Error) {
        const monitoringService = this.injector.get(MonitoringService);
        monitoringService.logError(error);
    }
}