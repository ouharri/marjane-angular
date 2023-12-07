import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingService} from "../../../core/services/routing.service";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

    constructor(private router: RoutingService, private authService: AuthenticationService) {
    }

    IsOpen = false;

    navigateTo(s: string) {
        this.router.navigateTo(s);
    }
    toggle() {
        this.IsOpen = !this.IsOpen;
    }
    logout() {
        this.authService.logout();
    }
}
