import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

export interface IAlert {
    id: number;
    type: string;
    strong?: string;
    message: string;
    icon?: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {

    @Input()
    private subscription: Subscription;
    messages: IAlert[] = [];

    constructor(private as: AlertService) { }

    ngOnInit() {
        this.subscription = this.as.getAlerts()
            .subscribe(messages => {
                this.messages = messages;
            });
    }

    close(alert: IAlert) {
        this.messages.splice(this.messages.indexOf(alert), 1);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}