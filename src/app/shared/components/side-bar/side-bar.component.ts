import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingService} from "../../../core/services/routing.service";

@Component({
    selector: 'app-side-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {

    constructor(private router: RoutingService) {
    }

    IsOpen = false;

    ngOnInit(): void {
        const side = document.querySelectorAll('.side');
        const sideBar = document.querySelector('#sideBar');
        const image = document.querySelectorAll('.image');
        const addModal = document.querySelector('#addModal');
        const addBtn = document.querySelector('.addBtn');
        const closeModel = document.querySelector('#');

        sideBar?.addEventListener('click', () => {
            this.IsOpen = !this.IsOpen;

            if (sideBar.classList.contains('w-[60px]'))
                sideBar.classList.replace('w-[60px]', 'w-60');
            else sideBar.classList.replace('w-60', 'w-[60px]');

            for (const i in side)
                side[i].classList.toggle('hidden');
        })

        addBtn?.addEventListener('click', () => {
                addModal?.classList.remove("hidden");
            }
        )

        closeModel?.addEventListener('click', () => {
            addModal?.classList.add("hidden");
        })
    }

    navigateTo(s: string) {
        console.log("navigateTo")
        this.router.navigateTo(s);
    }

    toggle() {
        this.IsOpen = !this.IsOpen;
    }
}
