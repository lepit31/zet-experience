import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-wack-a-mole-game',
    templateUrl: './wack-a-mole-game.component.html',
    styleUrls: ['./wack-a-mole-game.component.scss']
})

export class WackAMoleGameComponent implements OnInit {
    @Input() strategy!: string;
    // columns and rows are fixe
    cols = [0, 1, 2, 3];
    rows = [0, 1, 2, 3];
    cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    newStates: Subject<string>[] = [];
    score = 0;
    gameInProgress = false;

    ngOnInit() {
        for (let i = 0; i <= (this.cols.length * this.rows.length); i++) {
            this.newStates.push(new Subject<string>());
        }

    }

    addScore($event: number) {
        this.score += $event;
    }


    start() {
        if (!this.gameInProgress) {
            this.score = 0;
            this.gameInProgress = true;
            let i = 0;
            const currentCases = [...this.cases];
            const inter = setInterval(
                () => {
                    if (this.strategy === 'easy') {
                        this.newStates[i].next('monster');
                    }
                    if (this.strategy === 'hard') {
                        // one monster on each case
                        this.newStates[currentCases.splice(this.randomIntFromInterval(0, currentCases.length), 1)[0]].next('monster');
                    }
                    i++;
                    if (i >= (this.cols.length * this.rows.length)) {
                        clearInterval(inter);
                        this.gameInProgress = false;
                    }
                }, 300
            );
        }
    }

    randomIntFromInterval(min: number, max: number): number {
        // min and max included
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
