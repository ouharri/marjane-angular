import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promotion} from '../model/promotion';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    private readonly baseUrl = 'http://localhost:8081/';

    constructor(private http: HttpClient) {
    }

    getAllPromotions(pg: number) {
        return this.http.get<Promotion>(this.baseUrl + `Responsable/promotion/?pg=${pg}`)
    }

    getTotalPage() {
        return this.http.get<number>(this.baseUrl + `Responsable/PNumbers`)
    }

    createPromotion(promotion: Promotion) {
        return this.http.post(this.baseUrl + `Center/promotion`, promotion);
    }
}
