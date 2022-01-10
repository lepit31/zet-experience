import {Component, OnInit} from '@angular/core';
import {MontyHallDoorModel} from './monty-hall-game/monty-hall-door.model';

@Component({
    selector: 'app-monty-hall',
    templateUrl: './monty-hall.component.html',
    styleUrls: ['./monty-hall.component.scss']
})

export class MontyHallComponent implements OnInit {

    noStrat: MontyHallDoorModel[] = [];
    noStratStep = 'init';
    noStratPartyPlayed = 0;
    noStratSuccess = 0;

    stratKeep: MontyHallDoorModel[] = [];
    stratKeepStep = 'init';
    stratKeepPartyPlayed = 0;
    stratKeepSuccess = 0;

    constructor() {
    }

    ngOnInit() {
        this.initNoStrat();
        this.initStratKeep();
    }

    initNoStrat() {
        this.noStrat = [];
        for (let i = 0; i < 3; i++) {
            this.noStrat.push(new MontyHallDoorModel());
        }
        // add red-card randomly
        const randIndex = this.randomIntFromInterval(0, 2);
        this.noStrat[randIndex].behindDoor = 'red-car';
        this.noStratStep = 'wait-user-first-choice';
        console.log(this.noStrat);
    }

    initStratKeep() {
        this.stratKeep = [];
        for (let i = 0; i < 9; i++) {
            this.stratKeep.push(new MontyHallDoorModel());
        }
        // add red-card randomly
        const randIndex = this.randomIntFromInterval(0, 8);
        this.stratKeep[randIndex].behindDoor = 'red-car';
        this.stratKeepStep = 'wait-user-first-choice';
    }

    randomIntFromInterval(min: number, max: number): number {
        // min and max included
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onNoStratChoice(choice: number) {
        // check if enabled
        if (this.noStrat[choice].enabled !== true) {
            return;
        }
        if (this.noStratStep === 'wait-user-first-choice') {
            // select the user choice
            this.noStrat[choice].selection = 'monty-hall-user-selection';
            // host select the red car and revel other
            for (let i = 0; i < this.noStrat.length; i++) {
                if (i !== choice) {
                    if (this.noStrat[i].behindDoor === 'red-car') {
                        this.noStrat[i].selection = 'monty-hall-host-selection';
                    } else {
                        this.noStrat[i].displayedImg = 'assets/img/monty-hall/goat.png';
                        this.noStrat[i].enabled = false;
                    }
                }
            }
            // in case user choice is the red car
            if (this.noStrat[choice].behindDoor === 'red-car') {
                // select first or last
                if (choice === 0) {
                    this.noStrat[(this.noStrat.length - 1)].displayedImg = 'assets/img/theme/curtain-200.jpg';
                    this.noStrat[(this.noStrat.length - 1)].selection = 'monty-hall-host-selection';
                    this.noStrat[(this.noStrat.length - 1)].enabled = true;
                } else {
                    this.noStrat[0].displayedImg = 'assets/img/theme/curtain-200.jpg';
                    this.noStrat[0].selection = 'monty-hall-host-selection';
                    this.noStrat[0].enabled = true;
                }
            }
            this.noStratStep = 'wait-user-final-choice';
            return;
        }
        if (this.noStratStep === 'wait-user-final-choice') {
            //reveal all card
            for (let i = 0; i < this.noStrat.length; i++) {
                if (this.noStrat[i].behindDoor === 'red-car') {
                    this.noStrat[i].displayedImg = 'assets/img/monty-hall/red_car.png';
                } else {
                    this.noStrat[i].displayedImg = 'assets/img/monty-hall/goat.png';
                }
                this.noStrat[i].enabled = false;
            }
            if (this.noStrat[choice].behindDoor === 'red-car') {
                this.noStratSuccess++;
                this.noStratStep = 'success';
            } else {
                this.noStratStep = 'fail';
            }
            this.noStratPartyPlayed++;
        }
    }

    onStratKeepChoice(choice: number) {
        // check if enabled
        if (this.stratKeep[choice].enabled !== true) {
            return;
        }
        if (this.stratKeepStep === 'wait-user-first-choice') {
            // select the user choice
            this.stratKeep[choice].selection = 'monty-hall-user-selection';

            for (let i = 0; i < this.stratKeep.length; i++) {
                if (this.stratKeep[i].behindDoor === 'red-car') {
                    this.stratKeep[i].displayedImg = 'assets/img/monty-hall/red_car.png';
                } else {
                    this.stratKeep[i].displayedImg = 'assets/img/monty-hall/goat.png';
                }
                this.stratKeep[i].enabled = false;
            }
            if (this.stratKeep[choice].behindDoor === 'red-car') {
                this.stratKeepSuccess++;
                this.stratKeepStep = 'success';
            } else {
                this.stratKeepStep = 'fail';
            }
            this.stratKeepPartyPlayed++;
        }
    }

    onNoStratReset() {
        this.initNoStrat();
    }

    onStratKeepReset() {
        this.initStratKeep();
    }
}
