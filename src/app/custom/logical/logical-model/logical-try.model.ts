import {LogicalFactModel} from './logical-fact.model';

export class LogicalTryModel {


    public name: string;
    // can be CONFIRM REFUTE
    public rule: string;
    public facts: LogicalFactModel[];


    constructor() {
    }
}
