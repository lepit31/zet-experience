import {Injectable} from '@angular/core';
import {FeelingFutureResponseModel} from './feeling-future-response.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FeelingFutureRequestModel} from './feeling-future-request.model';

@Injectable({
    providedIn: 'root'
})
export class FeelingFutureService {

    constructor(protected http: HttpClient) {
    }

    getResult(request: FeelingFutureRequestModel): Observable<HttpResponse<FeelingFutureResponseModel>> {
        return this.http.post<FeelingFutureResponseModel>('/feeling-future/get-response', request, {observe: 'response'});
    }
}
