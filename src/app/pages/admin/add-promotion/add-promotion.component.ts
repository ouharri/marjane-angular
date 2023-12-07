import {Component, Inject, Injector, NO_ERRORS_SCHEMA} from '@angular/core';
import {PromotionService} from "../../../core/services/promotion.service";
import {SideBarComponent} from "../../../shared/components/side-bar/side-bar.component";
import {CommonModule} from '@angular/common';
import {TuiDataListModule, TuiDialogService} from '@taiga-ui/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiDataListWrapperModule, TuiSelectModule} from '@taiga-ui/kit';

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
    ],
    templateUrl: './add-promotion.component.html',
    styleUrl: './add-promotion.component.css',
    schemas: [NO_ERRORS_SCHEMA],
})
export class AddPromotionComponent {

    constructor(private promotion: PromotionService, @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector) {
    }


    items = [
        'Luke Skywalker',
        'Leia Organa Solo',
        'Darth Vader',
        'Han Solo',
        'Obi-Wan Kenobi',
        'Yoda',
    ];

    testForm = new FormGroup({
        testValue: new FormControl(),
    });

    testValue = new FormControl();
}
