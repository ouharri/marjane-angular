import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCenterComponent } from './Components/admin-center/admin-center.component';
import { HomeComponent } from './Components/home/home.component';
import { PromotionComponent } from './Components/promotion/promotion.component';
const routes: Routes = [
  {path:'AdminCenter',component: AdminCenterComponent },
  {path:'home',component: HomeComponent},
  {path:'promotion',component: PromotionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
