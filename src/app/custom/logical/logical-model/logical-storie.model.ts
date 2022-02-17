import {LogicalFactModel} from './logical-fact.model';

export class LogicalStorieModel {


    public name: string;
    // can be CONFIRM REFUTE
    public rule: string;
    public facts: LogicalFactModel[];


    constructor() {
    }
}
