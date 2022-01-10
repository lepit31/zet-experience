import {Component, Input, OnInit} from '@angular/core';
import {MontyHallDoorModel} from './monty-hall-door.model';

@Component({
    selector: 'app-monty-hall-game',
    templateUrl: './monty-hall-game.component.html',
    styleUrls: ['./monty-hall-game.component.scss']
})
export class MontyHallGameComponent implements OnInit {

    @Input() nbDoors!: number;
    @Input() strategy!: string;

    constructor() {
    }

    montyHallGame: MontyHallDoorModel[] = [];
    montyHallGameStep = 'init';
    montyHallGamePartyPlayed = 0;
    montyHallGameSuccess = 0;

    // columns are fixe
    cols = [0, 1, 2];
    rows = [0];

    ngOnInit(): void {
        // fill rows with nbDoors
        this.rows = Array.from(Array(Math.ceil(this.nbDoors / 3)).keys());
        this.initMontyHallGame();
    }

    initMontyHallGame() {
        this.montyHallGame = [];
        for (let i = 0; i < this.nbDoors; i++) {
            this.montyHallGame.push(new MontyHallDoorModel());
        }
        // add red-card randomly
        const randIndex = this.randomIntFromInterval(0, this.nbDoors - 1);
        this.montyHallGame[randIndex].behindDoor = 'red-car';
        this.montyHallGameStep = 'wait-user-first-choice';
    }

    randomIntFromInterval(min: number, max: number): number {
        // min and max included
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onMontyHallGameChoice(choice: number) {
        // check if enabled
        if (this.montyHallGame[choice].enabled !== true) {
            return;
        }
        if (this.montyHallGameStep === 'wait-user-first-choice') {
            // select the user choice
            this.montyHallGame[choice].selection = 'monty-hall-user-selection';
            // host select the red car and revel other
            for (let i = 0; i < this.montyHallGame.length; i++) {
                if (i !== choice) {
                    if (this.montyHallGame[i].behindDoor === 'red-car') {
                        this.montyHallGame[i].selection = 'monty-hall-host-selection';
                    } else {
                        this.montyHallGame[i].displayedImg = 'assets/img/monty-hall/goat.png';
                        this.montyHallGame[i].enabled = false;
                    }
                }
            }
            // in case user choice is the red car
            if (this.montyHallGame[choice].behindDoor === 'red-car') {
                // select first or last
                if (choice === 0) {
                    this.disableDoor(this.montyHallGame.length - 1);
                } else {
                    this.disableDoor(0);
                }
            }
            // if no strategy wait for user second input
            if (this.strategy === 'none') {
                this.montyHallGameStep = 'wait-user-final-choice';
                return;
            }
            if (this.strategy === 'keep') {

                this.revealAllDoors('monty-hall-user-selection');
            }

            if (this.strategy === 'change') {

                this.revealAllDoors('monty-hall-host-selection');
            }

        }

        // if no strategy wait for user second input
        if (this.montyHallGameStep === 'wait-user-final-choice') {
            this.revealAllDoors(this.montyHallGame[choice].behindDoor === 'red-car' ? this.montyHallGame[choice].selection : 'none');
        }
    }

    disableDoor(doorPosition: number) {
        this.montyHallGame[doorPosition].displayedImg = 'assets/img/monty-hall/door.png';
        this.montyHallGame[doorPosition].selection = 'monty-hall-host-selection';
        this.montyHallGame[doorPosition].enabled = true;
    }

    revealAllDoors(successSelection: string) {
        for (let i = 0; i < this.montyHallGame.length; i++) {
            if (this.montyHallGame[i].behindDoor === 'red-car') {
                this.montyHallGame[i].displayedImg = 'assets/img/monty-hall/red_car.png';
                if (successSelection === this.montyHallGame[i].selection) {
                    this.montyHallGameSuccess++;
                    this.montyHallGameStep = 'success';
                } else {
                    this.montyHallGameStep = 'fail';
                }
            } else {
                this.montyHallGame[i].displayedImg = 'assets/img/monty-hall/goat.png';
            }
            this.montyHallGame[i].enabled = false;
        }
        this.montyHallGamePartyPlayed++;
    }

    onMontyHallGameReset() {
        this.initMontyHallGame();
    }


}
