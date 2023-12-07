import { Component } from '@angular/core';
import {SideBarComponent} from "../../../shared/components/side-bar/side-bar.component";
import {StatisticComponent} from "../statistic/statistic.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SideBarComponent,
    StatisticComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
