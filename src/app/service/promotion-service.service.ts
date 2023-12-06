import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PromotionServiceService {

  constructor(private https : HttpClient) { }
  url = 'http://localhost:8080/';
  fetchCategory(pg : any){
      return this.https.get(this.url+`Responsable/promotion/?pg=${pg}`);
  }

  fetchPageNumber(){
    return this.https.get(this.url + 'Responsable/PNumbers');
  }
}
