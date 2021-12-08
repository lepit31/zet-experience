import {Injectable} from '@angular/core';
import {FeelingFutureResponseModel} from './feeling-future-response.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {FeelingFutureRequestModel} from './feeling-future-request.model';

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
            {observe: 'response'
            }
        );
    }
}
