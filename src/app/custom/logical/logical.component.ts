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

    nbChecked = 0;
    nbUselessChecked = 0;

    ngOnInit(): void {

        this.logicalService.getData('assets/data/logical.json').subscribe(
            (response: HttpResponse<LogicalModel>) => {
                this.logicalModel = response.body;
                this.setRandomStorie();
            }
            , () => {
            }
        );

    }

    verifyFact(index: number) {
        this.currentStorie.facts[index].verified = true;
        this.nbChecked++;
        if(this.currentStorie.facts[index].rule == 'NONE') {
            this.nbUselessChecked++;
        }
    }

    selectChoice(choice: string) {
        this.currentChoice = choice;
    }

    setRandomStorie() {
        // make deep copy
        let i  = 0;
        if (Math.random() > 0.5) {
            i = 1;
        }
        this.currentStorie = JSON.parse(JSON.stringify(this.logicalModel.stories[i]));
        this.shuffle(this.currentStorie.facts);
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    raz() {
        this.nbChecked = 0;
        this.nbUselessChecked = 0;
        this.currentChoice = '';
        this.setRandomStorie();
    }


    getFactClass(fact: LogicalFactModel) {
        if (fact.verified && this.currentChoice !== '') {
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
