import {Component, Input, OnInit} from '@angular/core';
import {BayesianSubjectModel} from './bayesian-subject.model';

@Component({
    selector: 'app-bayesian',
    templateUrl: './bayesian.component.html',
    styleUrls: ['./bayesian.component.scss']
})

export class BayesianComponent implements OnInit {

    @Input() subject!: BayesianSubjectModel;

    initialHypothesisArea = [];

    currentRange = [];

    finalHypothesisArea = [];

    hypothesisColor = ['default', 'danger', 'primary', 'warning', 'info', 'success'];


    constructor() {
    }

    ngOnInit() {
        //initialise hypothesis area (in percent)
        this.subject.hypotheses.forEach((hypothesis, index) => {
            this.initialHypothesisArea.push(hypothesis.value);
            this.finalHypothesisArea.push(hypothesis.value);
            this.currentRange.push(50);
        });

    }

    resize(): void {

        // Calculate the new total area
        let newAreaTotal = 0;
        const newAreas = [];

        this.currentRange.forEach((value, index) => {
            // avoid value of 0% , the hypothesis must always exist
            const newRange = value === 0 ? 1 : value;
            const newArea = (this.initialHypothesisArea[index] / 100 * newRange / 100);
            newAreas.push(newArea);
            newAreaTotal += newArea;
        });

        this.finalHypothesisArea.forEach((value, index) => {
            this.finalHypothesisArea[index] = 100 / (newAreaTotal / newAreas[index]);
        });


    }


    trackByIndex(index: number, obj: any): any {
        return index;
    }
}
