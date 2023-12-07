import {Component, Inject, Injector, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import {PromotionService} from "../../../core/services/promotion.service";
import {Promotion} from "../../../core/model/promotion";
import {SideBarComponent} from "../../../shared/components/side-bar/side-bar.component";
import {CommonModule} from '@angular/common';
import {LoginComponent} from "../../authentication/login/login.component";
import {TestComponent} from "../../../shared/components/test/test.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiDataListModule, TuiDialogService} from '@taiga-ui/core';
import {TuiDataListWrapperModule, TuiSelectModule} from '@taiga-ui/kit';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {AddPromotionComponent} from "../add-promotion/add-promotion.component";

@Component({
    selector: 'app-promotion',
    standalone: true,
    imports: [
        SideBarComponent,
        CommonModule,
        LoginComponent,
        TestComponent,
        FormsModule,
        ReactiveFormsModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
    ],
    templateUrl: './promotion.component.html',
    styleUrl: './promotion.component.css',
    schemas: [NO_ERRORS_SCHEMA],
})
export class PromotionComponent implements OnInit {

    constructor(private promotion: PromotionService,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector) {
    }

    showDialog(): void {
        this.dialogs
            .open(
                new PolymorpheusComponent(AddPromotionComponent, this.injector),
                {
                    size: 'l',
                    closeable: true,
                    dismissible: true,
                },
            )
            .subscribe();
    }

    ngOnInit(): void {
        this.getAllPromotions();
    }

    loopArray = new Array(0);
    promotions: Promotion[] = []
    totalPage: number = 0;

    getAllPromotions() {
        this.promotion.getAllPromotions(1).subscribe((data: any) => {
            this.promotions = data;
            console.log(this.promotions);
        });
    }

    getPromotionsByPage(page: number) {
        this.promotion.getAllPromotions(page).subscribe((data: any) => {
            this.promotions = data;
            console.log(this.promotions);
        });
    }

    getTotalPage() {
        this.promotion.getTotalPage().subscribe((data: any) => {
            this.totalPage = data;
            this.loopArray = new Array(this.totalPage);
        });
    }

}
