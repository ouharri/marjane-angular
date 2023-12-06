import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Marjane-Front';
  Home : boolean = true;
  Admin : boolean = false;
  Promotion : boolean = false;

  
  change(selectedPage: string): void {
    this.Home = selectedPage === 'Home';
    this.Admin = selectedPage === 'Admin';
    this.Promotion = selectedPage === 'Promotion';
  }
  
}



