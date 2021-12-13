import {Injectable} from '@angular/core';
import {FeelingFutureResponseModel} from './feeling-future-response.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FeelingFutureRequestModel} from './feeling-future-request.model';
import {FeelingFutureStatisticModel} from './feeling-future-statistic.model';

@Injectable({
    providedIn: 'root'
})

export class FeelingFutureService {


    constructor(protected http: HttpClient) {
    }


    sendPrediction(request: FeelingFutureRequestModel): Observable<HttpResponse<FeelingFutureResponseModel>> {
        return this.http.post<FeelingFutureResponseModel>(
            'https://s37se9vy5m.execute-api.eu-west-1.amazonaws.com/prod/send-prediction',
            request,
            {
                observe: 'response'
            }
        );
    }

    getStatistic(pseudo?: string): Observable<HttpResponse<FeelingFutureStatisticModel>> {
        let param = '';
        if (pseudo != null && pseudo !== '') {
            param = '?pseudo=' + pseudo;
        }

        return this.http.get<FeelingFutureStatisticModel>(
            'https://s37se9vy5m.execute-api.eu-west-1.amazonaws.com/prod/get-statistic' + param,
            {
                observe: 'response'
            }
        );
    }
}
