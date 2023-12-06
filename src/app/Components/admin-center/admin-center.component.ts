import { Component, OnInit } from '@angular/core';
import { AdminCenter } from '../../Model/admin-center';
import {AdminCenterServiceService} from '../../service/admin-center-service.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Model/category';


@Component({
  selector: 'app-admin-center',
  templateUrl: './admin-center.component.html',
  styleUrls: ['./admin-center.component.css']
})
export class AdminCenterComponent implements OnInit{
  

  ACenter = new AdminCenter();
  Categorylist : any;
  ResMsg : String = '';
  Categories : Category[] = [];
  
  constructor(private ACService : AdminCenterServiceService , private toastr: ToastrService){}
  
  ngOnInit(){
    this.getCategories();
  }

  onSubmit(){
    console.log(this.ACenter);
    this.ACService.insertData(this.ACenter).subscribe((res)=>{
      this.ResMsg = "created successfully";
      this.showSuccess('created successfully');
    },
    (err)=>{
      console.log(err);
      this.showError('there is an error');
    }
    );
  
    
  }

  showSuccess(msg : string) {
    this.toastr.success(msg, 'Toastr fun!');
  }
  

  showError(msg : string){
    this.toastr.error(msg,'Toastr err!')
  }

  getCategories(){
    this.ACService.getCategories().subscribe( (res ) =>{
        this.Categorylist = res;
        console.log(this.Categorylist);
        const Res =  Object.keys(res);
        for(let i = 0;i<this.Categorylist.length;i++) {
          this.Categories.push(this.Categorylist[i]);
        }
        console.log(this.Categories);
    },(err)=>{
      console.log(err);
    }

    )
  }  
  


}
