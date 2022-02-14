import {Component, OnInit} from '@angular/core';
import {BayesianService} from './bayesian.service';
import {HttpResponse} from '@angular/common/http';
import {BayesianModel} from './bayesian.model';
import {BayesianStorieModel} from './bayesian-storie.model';
import {BayesianProfileModel} from './bayesian-profile.model';

@Component({
    selector: 'app-bayesian-page',
    templateUrl: './bayesian-page.component.html',
    styleUrls: ['./bayesian-page.component.scss']
})

export class BayesianPageComponent implements OnInit {

    debug = '';
    bayes: BayesianModel;
    currentStorie: BayesianStorieModel;
    currentProfile: BayesianProfileModel;
    step = 1;

    constructor(private bayesianService: BayesianService) {
    }

    ngOnInit() {

        this.bayesianService.getData('assets/data/bayesian.json').subscribe(
            (response: HttpResponse<BayesianModel>) => {
                this.debug = JSON.stringify(response.body);
                this.bayes = response.body;
                this.currentStorie = this.bayes.stories[0];
                this.currentProfile = this.currentStorie.profiles[0];
            }
            , () => {
                this.debug = 'error';
            }
        );
    }

    onChangeStorie() {
        this.currentProfile = this.currentStorie.profiles[0];
        this.step = 1;
    }

    getBayesianClass() {
        if (this.currentProfile != null) {
            if (this.currentProfile.subjects.length === 1) {
                return 'col-sm-4 offset-4';
            }
            if (this.currentProfile.subjects.length === 2) {
                return 'col-sm-4 offset-1';
            }
            if (this.currentProfile.subjects.length === 3) {
                return 'col-sm-4';
            }
            if (this.currentProfile.subjects.length >= 4) {
                return 'col-sm-3';
            }
        }
        return 'col-sm-12';
    }
}
