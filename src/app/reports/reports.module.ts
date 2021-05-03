import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { MonthlyActivityComponent } from './monthly-activity/monthly-activity.component';


@NgModule({
  declarations: [
    MonthlyActivityComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
