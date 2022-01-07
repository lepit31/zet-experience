import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-zerner',
    templateUrl: './zerner.component.html',
    styleUrls: ['./zerner.component.scss']
})

export class ZernerComponent implements OnInit {
    zenerCards = [
        'circle', 'circle', 'circle', 'circle', 'circle',
        'cross', 'cross', 'cross', 'cross', 'cross',
        'square', 'square', 'square', 'square', 'square',
        'star', 'star', 'star', 'star', 'star',
        'wave', 'wave', 'wave', 'wave', 'wave'
    ];
    currentZenerCards = [];
    currentZenerCard = '';

    nbZenerTested = 0;
    nbZenerSuccess = 0;
    nbZenerError = 0;

    constructor() {
    }

    ngOnInit() {
        this.initZenerCards();
    }

    displayZenerCard() {
        if (this.nbZenerTested < this.zenerCards.length) {
            this.currentZenerCard = 'assets/img/zener/zener-' + this.currentZenerCards[this.nbZenerTested] + '.png';
        } else {
            this.currentZenerCard = 'assets/img/theme/blank.jpg';
        }
    }

    onZenerError() {
        this.nbZenerError++;
        this.nbZenerTested++;
        this.displayZenerCard();
    }

    onZenerSuccess() {
        this.nbZenerSuccess++;
        this.nbZenerTested++;
        this.displayZenerCard();
    }

    initZenerCards() {
        const tmpZenerCards = Object.assign([], this.zenerCards);
        for (let i = 0; i < this.zenerCards.length; i++) {
            this.currentZenerCards.push(tmpZenerCards.splice(this.randomIntFromInterval(0, tmpZenerCards.length - 1), 1)[0]);
        }
        this.displayZenerCard();
    }

    randomIntFromInterval(min: number, max: number): number {
        // min and max included
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
