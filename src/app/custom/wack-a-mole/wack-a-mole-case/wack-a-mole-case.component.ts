import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-wack-a-mole-case',
    templateUrl: './wack-a-mole-case.component.html',
    styleUrls: ['./wack-a-mole-case.component.scss']
})

export class WackAMoleCaseComponent implements OnInit, OnDestroy {

    @Output() winEvent = new EventEmitter<number>();
    @Input() event: Observable<string>;
    private eventsSubscription: Subscription;
    state = 'blank';

    ngOnInit() {
        this.eventsSubscription = this.event.subscribe((newState: string) => {
            this.state = newState;
        });
    }

    win() {
        this.state = 'monaie';
        this.winEvent.emit(10);
        setTimeout(() => {
            // prevent change if raz
            if (this.state === 'monaie') {
                this.state = 'blank';
            }
        }, 1000);
    }

    ngOnDestroy() {
        this.eventsSubscription.unsubscribe();
    }
}
