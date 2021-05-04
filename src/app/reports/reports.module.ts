import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { MonthlyActivityComponent } from './monthly-activity/monthly-activity.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    MonthlyActivityComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
