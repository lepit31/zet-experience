import {Component, OnInit} from '@angular/core';
import {MontyHallCardModel} from './monty-hall-card.model';

@Component({
    selector: 'app-monty-hall',
    templateUrl: './monty-hall.component.html',
    styleUrls: ['./monty-hall.component.scss']
})

export class MontyHallComponent implements OnInit {

    noStrat: MontyHallCardModel[] = [];
    noStratStep = 'init';

    constructor() {
    }

    ngOnInit() {
        this.initNoStrat();
    }

    initNoStrat() {
        this.noStrat = [];
        for (let i = 0; i < 3; i++) {
            this.noStrat.push(new MontyHallCardModel());
        }
        // add red-card randomly
        this.noStrat[this.randomIntFromInterval(0, 3)].behindCurtain = 'red-car';
        this.noStratStep = 'wait-user-first-choice';
        console.log( this.noStrat);
    }

    randomIntFromInterval(min: number, max: number): number {
        // min and max included
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onNoStrat(choice: number) {
        if (this.noStratStep === 'wait-user-first-choice') {
            // select the user choice
            this.noStrat[choice].selection = 'monty-hall-user-selection';
            // host select the red car and blank other
            for (let i = 0; i < this.noStrat.length; i++) {
                if (i !== choice) {
                    if (this.noStrat[i].behindCurtain === 'red-car') {
                        this.noStrat[i].selection = 'monty-hall-host-selection';
                    } else {
                        this.noStrat[i].displayedImg = 'assets/img/theme/blank-200.jpg';
                    }
                }
            }
            // in case user choice is the red car
            if (this.noStrat[choice].behindCurtain === 'red-car') {
                //select first or last
                if (choice === 0) {
                    this.noStrat[(this.noStrat.length - 1)].displayedImg = 'assets/img/theme/curtain-200.jpg';
                    this.noStrat[(this.noStrat.length - 1)].selection = 'monty-hall-host-selection';
                } else {
                    this.noStrat[0].displayedImg = 'assets/img/theme/curtain-200.jpg';
                    this.noStrat[0].selection = 'monty-hall-host-selection';
                }
            }
        }
    }
}
