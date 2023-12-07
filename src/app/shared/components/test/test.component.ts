import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TuiDay, TuiDayRange, TuiMonth} from '@taiga-ui/cdk';
import {NgIf} from "@angular/common";
import {TuiCalendarModule, TuiDialogContext} from "@taiga-ui/core";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'app-test',
    standalone: true,
    templateUrl: './test.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        TuiCalendarModule,
        SideBarComponent
    ]
})
export class TestComponent {
    value: TuiDayRange | null = null;

    firstMonth = TuiMonth.currentLocal();

    lastMonth = TuiMonth.currentLocal().append({month: 1});

    hoveredItem: TuiDay | null = null;

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>,
    ) {
    }

    close(): void {
        this.context.completeWith(false);
    }

    onDayClick(day: TuiDay): void {
        console.log(this.value?.from.toJSON(), this.value?.to.toJSON())
        if (this.value === null || !this.value.isSingleDay) {
            this.value = new TuiDayRange(day, day);
        }

        this.value = TuiDayRange.sort(this.value.from, day);
    }

    onMonthChangeFirst(month: TuiMonth): void {
        this.firstMonth = month;
        this.lastMonth = month.append({month: 1});
    }

    onMonthChangeMiddle(month: TuiMonth): void {
        this.firstMonth = month.append({month: -1});
        this.lastMonth = month.append({month: 1});
    }

    onMonthChangeLast(month: TuiMonth): void {
        this.firstMonth = month.append({month: -1});
        this.lastMonth = month;
    }
}
