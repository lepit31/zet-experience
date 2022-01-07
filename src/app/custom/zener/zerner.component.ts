import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-zerner',
    templateUrl: './zerner.component.html',
    styleUrls: ['./zerner.component.scss']
})

export class ZernerComponent implements OnInit {

    nbZenerTested = 0;
    nbZenerSuccess = 0;
    nbZenerError = 0;

    constructor() {
    }

    ngOnInit() {
    }

    onZenerError() {
        this.nbZenerError++;
    }
    onZenerNext() {
        this.nbZenerTested++;
    }
    onZenerSuccess() {
        this.nbZenerSuccess++;
    }
}
