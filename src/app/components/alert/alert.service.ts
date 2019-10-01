import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAlert } from './alert.interface';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private alerts = new Subject<IAlert[]>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    getAlerts(): Observable<IAlert[]> {
        return this.alerts.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alerts.next([{ id: 1, type: 'success', icon: 'fa fa-check', message }]);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alerts.next([{ id: 2, type: 'error', icon: 'fa fa-check', message }]);
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.alerts.next();
    }
}