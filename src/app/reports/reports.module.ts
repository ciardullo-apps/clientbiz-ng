import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { MonthlyActivityComponent } from './monthly-activity/monthly-activity.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { ActivityYearMonthComponent } from './activity-year-month/activity-year-month.component';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    ReportsRoutingModule,
    ActivityYearMonthComponent,
    MonthlyActivityComponent,
  ],
})
export class ReportsModule { }
