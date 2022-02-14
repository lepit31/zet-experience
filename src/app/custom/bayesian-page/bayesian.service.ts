import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BayesianModel} from './bayesian-model/bayesian.model';

@Injectable({
    providedIn: 'root'
})

export class BayesianService {


    constructor(protected http: HttpClient) {
    }

    getData(filePath: string): Observable<HttpResponse<BayesianModel>> {
        return this.http.get<BayesianModel>(
            filePath,
            {
                observe: 'response'
            }
        );
    }
}
