import { Component, OnInit } from '@angular/core';
import { PromotionServiceService } from 'src/app/service/promotion-service.service';
import { ActivatedRoute } from '@angular/router';
import { ElementRef, AfterViewInit } from '@angular/core';
import { Promotion } from 'src/app/Model/promotion';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit{
  isActive : boolean = false;
  promotions : Promotion[] = [];
  promotionList : any;
  pagenumber : any;
  arr : any[] = [];
  idx : any;
  pg  :any;
  constructor(private promotionService : PromotionServiceService,private route : ActivatedRoute ,private el: ElementRef)  { }
  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      console.log(params.get('pg'));
      this.pg = params.get('pg');
    })
    this.getPromotions(1);
    this.getPagesN();
  }
  

 
  getPromotions(pg : any){
      this.promotionService.fetchCategory(pg).subscribe(
        (res)=>{
          this.promotionList = res;
          this.promotions = [];
          for(let i = 0;i<this.promotionList.length;i++){
            this.promotions.push(this.promotionList[i]);
          }
          console.log(res);
          this.el.nativeElement
        }
      ) 
  }

  getPagesN(){
    this.promotionService.fetchPageNumber().subscribe(res=>{
      console.log(res);
      
      this.pagenumber = res;
      this.Pagination();
    })
  }
  Pagination(){
    for(let i = 0 ; i<this.pagenumber;i++){
      
      this.arr.push(i);
    }
  }
  move(index : any,e : Event){
    //let currentParams = this.route.snapshot.queryParams;
    //console.log(currentParams['pg'] = 1);
    const btns = document.querySelectorAll('.pagItem');
    console.log(btns);
    btns.forEach((btn)=>{
      btn.classList.remove('active');
    })
    console.log(e.target);
    const button = e.target as HTMLButtonElement;
    button.classList.toggle('active');
    
    this.idx = index;
    this.getPromotions(index);

  }

  next(e : Event){
    this.idx = this.idx + 1 ; 
    this.getPromotions(this.idx);

    e.preventDefault();
  }
  
  Previous(e : Event){
    this.idx = this.idx - 1 ; 
    this.getPromotions(this.idx);

    e.preventDefault();
  }

}
