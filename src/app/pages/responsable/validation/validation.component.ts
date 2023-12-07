import {Component, Inject, Injector, NO_ERRORS_SCHEMA} from '@angular/core';
import {PromotionService} from "../../../core/services/promotion.service";
import {Promotion} from "../../../core/model/promotion";
import {SideBarComponent} from "../../../shared/components/side-bar/side-bar.component";
import {CommonModule} from '@angular/common';
import {LoginComponent} from "../../authentication/login/login.component";
import {TestComponent} from "../../../shared/components/test/test.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiAlertService, TuiDataListModule, TuiDialogService} from '@taiga-ui/core';
import {TuiDataListWrapperModule, TuiSelectModule} from '@taiga-ui/kit';
import {ResponsableRayonService} from "../../../core/services/responsable-rayon.service";
import Swal from 'sweetalert2'
import {CategoryService} from "../../../core/services/category.service";
import {Category} from "../../../core/model/category";

@Component({
    selector: 'app-validation',
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
    templateUrl: './validation.component.html',
    schemas: [NO_ERRORS_SCHEMA],

})
export class ValidationComponent {
    constructor(private promotion: PromotionService,
                private resp: ResponsableRayonService,
                private category: CategoryService,
                @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector) {
    }

    ngOnInit(): void {
        this.getTotalPage();
        this.getAllPromotions();
        this.getAllCategories();
    }

    loopArray = new Array(0);
    currentPage: number = 1;
    promotions: Promotion[] = []
    categories: Category[] = [];
    items: Category[] = [];
    totalPage: number = 0;

    getPromotionsByPage() {
        this.promotion.getAllPromotions(this.currentPage).subscribe((data: any) => {
            this.promotions = data;
        });
    }

    previousPage() {
        this.currentPage--;
        this.getPromotionsByPage();
    }

    nextPage() {
        this.currentPage++;
        this.getPromotionsByPage();
    }

    getTotalPage() {
        this.promotion.getTotalPage().subscribe((data: any) => {
            this.totalPage = data;
            this.loopArray = new Array(this.totalPage);
        });
    }

    getAllPromotions() {
        this.promotion.getAllPromotions(this.currentPage).subscribe((data: any) => {
            this.promotions = data;
        });
    }

    changePage(param: any) {
        this.currentPage = param;
        this.getPromotionsByPage();
    }

    acceptPromotion(p: Promotion) {
        if (p.status == "Validé") {
            this.alerts.open('', {
                label: 'Already Accepted',
                status: 'warning',
                autoClose: true,
            }).subscribe();
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0155a7",
            cancelButtonColor: "#dd0100",
            confirmButtonText: "Yes, Accept!"
        }).then((result) => {
            if (result.isConfirmed) {
                this.resp.acceptPromotion(p.idPr);
                this.getPromotionsByPage();
                this.alerts.open('', {
                    label: 'Successfully Aprouved',
                    status: 'success',
                    autoClose: true,
                }).subscribe();
            }
        });
    }

    refuserPromontion(p: Promotion) {
        if (p.status == "Refusé") {
            this.alerts.open('', {
                label: 'Already Refused',
                status: 'warning',
                autoClose: true,
            }).subscribe();
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0155a7",
            cancelButtonColor: "#dd0100",
            confirmButtonText: "Yes, Accept!"
        }).then((result) => {
            if (result.isConfirmed) {
                this.resp.acceptPromotion(p.idPr);
                this.getPromotionsByPage();
                this.alerts.open('', {
                    label: 'Successfully Refused',
                    status: 'success',
                    autoClose: true,
                }).subscribe();
            }
        });
    }

    private getAllCategories() {
        this.category.getAllCategories().subscribe((data: any) => {
                this.categories = data;
                this.items = data.map((item: Category) => {
                    return item.titre
                });
            }
        );
    }
}
