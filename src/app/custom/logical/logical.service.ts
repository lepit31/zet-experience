import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {LogicalModel} from './logical-model/logical.model';

@Injectable({
    providedIn: 'root'
})

export class LogicalService {


    constructor(protected http: HttpClient) {
    }

    getData(filePath: string): Observable<HttpResponse<LogicalModel>> {
        return this.http.get<LogicalModel>(
            filePath,
            {
                observe: 'response'
            }
        );
    }
}
