import {Component, OnInit} from '@angular/core';
import {SideBarComponent} from "../../../shared/components/side-bar/side-bar.component";
import {Statistic} from "../../../core/model/statistic";
import {StatisticService} from "../../../core/services/statistic.service";

@Component({
    selector: 'app-statistic',
    standalone: true,
    imports: [
        SideBarComponent
    ],
    templateUrl: './statistic.component.html',
    styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit {
    constructor(private statistic: StatisticService) {
    }

    ngOnInit(): void {
        this.getAllStatistic();
    }

    static: Statistic = {};

    getAllStatistic() {
        this
            .statistic
            .getAllStatistics()

            .subscribe(
                (data: any) => {
                    this.static = data;
                }
            );
    }
}
