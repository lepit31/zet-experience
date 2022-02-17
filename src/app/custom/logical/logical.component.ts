import {Component, OnInit} from '@angular/core';
import {LogicalModel} from './logical-model/logical.model';
import {HttpResponse} from '@angular/common/http';
import {LogicalService} from './logical.service';
import {LogicalStorieModel} from './logical-model/logical-storie.model';

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

}
