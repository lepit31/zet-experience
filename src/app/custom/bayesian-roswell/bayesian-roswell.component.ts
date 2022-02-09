import {Component, OnInit} from '@angular/core';
import {BayesianService} from '../bayesian/bayesian.service';
import {HttpResponse} from '@angular/common/http';
import {BayesianModel} from '../bayesian/bayesian.model';

@Component({
    selector: 'app-bayesian-roswell',
    templateUrl: './bayesian-roswell.component.html',
    styleUrls: ['./bayesian-roswell.component.scss']
})

export class BayesianRoswellComponent implements OnInit {

    debug = '';
    bayes : BayesianModel;

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
                this.debug = JSON.stringify(response.body);
                this.bayes = response.body;
            }
            , () => {
                this.debug = 'error';
            }
        );
    }

}
