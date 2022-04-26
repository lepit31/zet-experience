import {BayesianHypothesisModel} from './bayesian-hypothesis.model';

export class BayesianStorieModel {
    public id: string;
    public name: string;
    public link: string;
    public description: string;
    public question: string;
    public hypotheses: BayesianHypothesisModel[];

    constructor() {
    }

}
