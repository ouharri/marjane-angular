import {Injectable} from '@angular/core';
import {Promotion} from "../model/promotion";
import {HttpClient} from '@angular/common/http';
import {Category} from "../model/category";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private readonly baseUrl = 'http://localhost:8081/';

    constructor(private http: HttpClient) {
    }

    getAllCategories() {
        return this.http.get<Category>(this.baseUrl + `Responsable/category`)
    }
}
