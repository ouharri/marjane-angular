import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promotion} from '../model/promotion';

@Injectable({
    providedIn: 'root'
})
export class ResponsableRayonService {

    private readonly baseUrl = 'http://localhost:8081/';

    constructor(private http: HttpClient) {
    }

    acceptPromotion(promotion: number) {
        this.http.post(this.baseUrl + `Responsable/promo`, promotion).subscribe();
    }
}
