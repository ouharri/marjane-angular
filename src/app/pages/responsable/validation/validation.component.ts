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
              @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) {
  }

  showDialog(): void {

  }

  ngOnInit(): void {
    this.getTotalPage();
    this.getAllPromotions();
  }

  loopArray = new Array(0);
  currentPage: number = 1;
  promotions: Promotion[] = []
  totalPage: number = 0;

  getAllPromotions() {
    this.promotion.getAllPromotions(this.currentPage).subscribe((data: any) => {
      this.promotions = data;
    });
  }

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

  changePage(param: any) {
    this.currentPage = param;
    this.getPromotionsByPage();
  }
}
