import {Component, OnInit} from '@angular/core';
import {LogicalModel} from './logical-model/logical.model';
import {HttpResponse} from '@angular/common/http';
import {LogicalService} from './logical.service';
import {LogicalStorieModel} from './logical-model/logical-storie.model';
import {LogicalFactModel} from './logical-model/logical-fact.model';

@Component({
    selector: 'app-logical',
    templateUrl: './logical.component.html',
    styleUrls: ['./logical.component.css']
})
export class LogicalComponent implements OnInit {

    constructor(private logicalService: LogicalService) {
    }

    logicalModel: LogicalModel;
    currentStorie: LogicalStorieModel;
    currentChoice = '';

    ngOnInit(): void {

        this.logicalService.getData('assets/data/logical.json').subscribe(
            (response: HttpResponse<LogicalModel>) => {
                this.logicalModel = response.body;
                this.currentStorie = this.logicalModel.stories[0];
            }
            , () => {
            }
        );

    }

    verifyFact(index: number) {
        this.currentStorie.facts[index].verified = true;
    }

    selectChoice(choice: string) {
        this.currentChoice = choice;
    }

    changeStorie() {
        this.currentChoice = '';
    }

    getFactClass(fact: LogicalFactModel) {
        if (fact.verified && this.currentChoice != '') {
            if (fact.rule === 'CONFIRM') {
                return 'bg-success';
            }
            if (fact.rule === 'REFUTE') {
                return 'bg-danger';
            }
            if (fact.rule === 'NONE') {
                return 'bg-warning';
            }
        }
        return '';
    }
}
