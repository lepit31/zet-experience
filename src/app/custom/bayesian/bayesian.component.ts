import {Component, OnInit} from '@angular/core';
import {BayesianStorieModel} from './bayesian-storie.model';
import {BayesianProfileModel} from './bayesian-profile.model';
import {BayesianModel} from './bayesian.model';
import {BayesianSubjectModel} from './bayesian-subject.model';
import {BayesianHypothesisModel} from './bayesian-hypothesis.model';
import {BayesianService} from './bayesian.service';
import {HttpResponse} from '@angular/common/http';

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
    bayesian = new BayesianModel();
    profile = new BayesianProfileModel();
    storie = new BayesianStorieModel();
    subject = new BayesianSubjectModel();
    hypothesis = new BayesianHypothesisModel();
    debug = '';

    constructor(private bayesianService: BayesianService) {
    }

    ngOnInit() {
        /*
                this.hypothesis.id = 'sub1_h0';
                this.hypothesis.name = 'H0 : une momie';
                this.hypothesis.value = 20;

                this.subject.id = 'sub1';
                this.subject.name = 'Que represente la photo ?';
                this.subject.hypotheses = [this.hypothesis];

                this.profile.id = 'Profil A';
                this.profile.name = 'Tenant';
                this.profile.description = 'Description du profil';
                this.profile.subjects = [this.subject];

                this.storie.id = 'storie1';
                this.storie.name = 'les Diapositives de Roswell';
                this.storie.steps = [
                    ' Presentation cadre de la decouverte',
                    ' Presentation de la photo',
                    ' Resemblance physique',
                    ' Montant métaliques',
                    ' etiquesttes',
                    ' carelage',
                    ' banc',
                    ' Panneau déflouté'
                ];

                this.baye.profiles = [this.profile];
                this.baye.stories = [this.storie];
        */
        this.bayesianService.getData('assets/data/bayesian-roswell.json').subscribe(
            (response: HttpResponse<BayesianModel>) => {
                this.bayesian = response.body;
                this.debug = JSON.stringify(this.bayesian);
            }
            , () => {
                this.debug = 'errror';
            }
        );
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
