import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promotion} from '../model/promotion';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {

    private readonly baseUrl = 'http://localhost:8081/';

    constructor(private http: HttpClient) {
    }

    getAllStatistics() {
        return this.http.get<Promotion>(this.baseUrl + `Center/statistics`);
    }

}
