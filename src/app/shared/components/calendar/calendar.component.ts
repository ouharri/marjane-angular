import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Output} from '@angular/core';
import {TuiDay, TuiDayRange, TuiMonth} from '@taiga-ui/cdk';
import {NgIf} from "@angular/common";
import {TuiCalendarModule, TuiDialogContext} from "@taiga-ui/core";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'app-calendar',
    standalone: true,
    templateUrl: './calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        TuiCalendarModule,
        SideBarComponent
    ]
})
export class CalendarComponent {
    value: TuiDayRange | null = null;
    firstMonth = TuiMonth.currentLocal();
    lastMonth = TuiMonth.currentLocal().append({month: 1});
    hoveredItem: TuiDay | null = null;

    @Output() statDateChange = new EventEmitter<string>();
    @Output() endDateChange = new EventEmitter<string>();

    constructor(
        @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>,
    ) {
    }

    close(): void {
        this.context.completeWith(false);
    }

    onDayClick(day: TuiDay): void {
        if (this.value === null || !this.value.isSingleDay)
            this.value = new TuiDayRange(day, day);
        this.value = TuiDayRange.sort(this.value.from, day);

        this.statDateChange.emit(this.value?.from.toJSON());
        this.endDateChange.emit(this.value?.to.toJSON());
    }

    onMonthChangeFirst(month: TuiMonth): void {
        this.firstMonth = month;
        this.lastMonth = month.append({month: 1});
    }

    onMonthChangeLast(month: TuiMonth): void {
        this.firstMonth = month.append({month: -1});
        this.lastMonth = month;
    }
}
