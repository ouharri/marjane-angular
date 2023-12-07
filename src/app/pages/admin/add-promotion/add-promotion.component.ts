import {Component, Inject, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import {SideBarComponent} from "../../../shared/components/side-bar/side-bar.component";
import {CommonModule} from '@angular/common';
import {TuiAlertService, TuiDataListModule, TuiDialogContext} from '@taiga-ui/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiDataListWrapperModule, TuiSelectModule} from '@taiga-ui/kit';
import {CategoryService} from "../../../core/services/category.service";
import {Category} from "../../../core/model/category";
import {TestComponent} from "../../../shared/components/test/test.component";
import {CalendarComponent} from "../../../shared/components/calendar/calendar.component";
import {PromotionService} from "../../../core/services/promotion.service";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'app-add-promotion',
    standalone: true,
    imports: [
        SideBarComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TestComponent,
        CalendarComponent,
    ],
    templateUrl: './add-promotion.component.html',
    schemas: [NO_ERRORS_SCHEMA],
})
export class AddPromotionComponent implements OnInit {

    statDate: Date | undefined;
    endDate: Date | undefined;

    open = true

    constructor(private category: CategoryService,
                private readonly promotion: PromotionService,
                @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>,
                @Inject(TuiAlertService) private readonly alerts: TuiAlertService) {
    }


    categories: Category[] = [];
    items: Category[] = [];

    ngOnInit(): void {
        this.category.getAllCategories().subscribe((data: any) => {
                this.categories = data;
                this.items = data.map((item: Category) => {
                    return item.titre
                });
                console.log(this.items)
            }
        );
    }

    displayValue = new FormControl("");

    close(): void {
        this.context.completeWith(false);
    }

    addPromotion() {
        if (this.displayValue.value == "" || this.statDate == undefined || this.endDate == undefined)
            this.alerts.open('', {
                label: 'Please enter all fields',
                status: 'warning',
                autoClose: true,
            }).subscribe();
        else {
            console.log({
                category: this.categories.filter(value => value.titre === this.displayValue.value),
                dateDebut: this.statDate,
                dateFin: this.endDate,
            })
            this.promotion.createPromotion({
                category: this.categories.filter(value => value.titre === this.displayValue.value)[0],
                dateDebut: this.statDate,
                dateFin: this.endDate,
            }).subscribe((data: any) => {
                this.alerts.open('', {
                    label: 'Promotion added successfully',
                    status: 'success',
                    autoClose: true,
                }).subscribe();
                this.close();
            });
        }
    }

    setStartDate($event: any) {
        this.statDate = $event;
    }

    setEndDate($event: any) {
        this.endDate = $event;
    }
}
