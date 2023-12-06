import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AdminCenterServiceService {

  constructor(private httpclient :  HttpClient) { }
  url = 'http://localhost:8080/';
  insertData(Data : any){
      return this.httpclient.post(this.url+'Center/promotion',Data);
  }

  getCategories(){
    return this.httpclient.get(this.url+'Responsable/category');
  }

}
