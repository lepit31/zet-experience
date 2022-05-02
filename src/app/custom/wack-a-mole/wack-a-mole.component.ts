import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-wack-a-mole',
    templateUrl: './wack-a-mole.component.html',
    styleUrls: ['./wack-a-mole.component.scss']
})

export class WackAMoleComponent implements OnInit {
    newStates: Subject<string>[] = [];
    score = 0;

    ngOnInit() {
        for (let i = 0; i <= 12; i++) {
            this.newStates.push(new Subject<string>());
        }

    }

    addScore($event: number) {
        this.score += $event;
    }

    raz() {
        this.newStates[1].next('monster');
    }
}
