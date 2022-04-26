import {Component, OnInit} from '@angular/core';
import {BayesianService} from './bayesian.service';
import {HttpResponse} from '@angular/common/http';
import {BayesianModel} from './bayesian-model/bayesian.model';
import {BayesianStorieModel} from './bayesian-model/bayesian-storie.model';

@Component({
    selector: 'app-bayesian-page',
    templateUrl: './bayesian-page.component.html',
    styleUrls: ['./bayesian-page.component.scss']
})

export class BayesianPageComponent implements OnInit {

    debug = '';
    bayes: BayesianModel;
    currentStorie: BayesianStorieModel;
    step = 1;

    constructor(private bayesianService: BayesianService) {
    }

    ngOnInit() {

        this.bayesianService.getData('assets/data/bayesian.json').subscribe(
            (response: HttpResponse<BayesianModel>) => {
                this.debug = JSON.stringify(response.body);
                this.bayes = response.body;
                this.currentStorie = this.bayes.stories[0];
            }
            , () => {
                this.debug = 'error';
            }
        );
    }


}
