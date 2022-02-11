import {BayesianProfileModel} from './bayesian-profile.model';

export class BayesianStorieModel {
    public id: string;
    public name: string;
    public steps: string[];
    public profiles: BayesianProfileModel[];

    constructor() {
    }

}
