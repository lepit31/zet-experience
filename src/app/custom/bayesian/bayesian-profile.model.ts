import {BayesianSubjectModel} from './bayesian-subject.model';

export class BayesianProfileModel {
    public id: string;
    public name: string;
    public description: string;
    public subjects: BayesianSubjectModel [];


    constructor() {
    }
}
