import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-bayesian',
    templateUrl: './bayesian.component.html',
    styleUrls: ['./bayesian.component.scss']
})

export class BayesianComponent implements OnInit {
    widthH0 = 25;
    widthH1 = 25;
    widthH2 = 25;
    widthH3 = 25;

    valueH0 = 50;
    valueH1 = 50;
    valueH2 = 50;
    valueH3 = 50;

    newWidthH0 = 25;
    newWidthH1 = 25;
    newWidthH2 = 25;
    newWidthH3 = 25;

    constructor() {
    }

    ngOnInit() {
    }

    resize(): any {

        // avoid value of 0% , the hypothesys must always exist
        const newValueH0 = this.valueH0 === 0 ? 1 : this.valueH0;
        const areaH0 = (this.widthH0 / 100 * newValueH0 / 100);

        const newValueH1 = this.valueH1 === 0 ? 1 : this.valueH1;
        const areaH1 = (this.widthH1 / 100 * newValueH1 / 100);

        const newValueH2 = this.valueH2 === 0 ? 1 : this.valueH2;
        const areaH2 = (this.widthH2 / 100 * newValueH2 / 100);

        const newValueH3 = this.valueH3 === 0 ? 1 : this.valueH3;
        const areaH3 = (this.widthH3 / 100 * newValueH3 / 100);

        // new total surface area
        const newTotalSurface = areaH0 + areaH1 + areaH2 + areaH3;

        this.newWidthH0 = 100 / (newTotalSurface / areaH0);
        this.newWidthH1 = 100 / (newTotalSurface / areaH1);
        this.newWidthH2 = 100 / (newTotalSurface / areaH2);
        this.newWidthH3 = 100 / (newTotalSurface / areaH3);
    }
}
