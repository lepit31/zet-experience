import {Component, OnInit} from '@angular/core';
import {LogicalModel} from './logical-model/logical.model';
import {HttpResponse} from '@angular/common/http';
import {LogicalService} from './logical.service';

@Component({
    selector: 'app-logical',
    templateUrl: './logical.component.html',
    styleUrls: ['./logical.component.css']
})
export class LogicalComponent implements OnInit {

    constructor(private logicalService: LogicalService) {
    }

    debug = '';

    ngOnInit(): void {

        this.logicalService.getData('assets/data/logical.json').subscribe(
            (response: HttpResponse<LogicalModel>) => {
                this.debug = JSON.stringify(response.body);
            }
            , () => {
                this.debug = 'error';
            }
        );

    }

}
