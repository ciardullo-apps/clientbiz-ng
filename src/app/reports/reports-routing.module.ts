import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityYearMonthComponent } from './activity-year-month/activity-year-month.component';
import { MonthlyActivityComponent } from './monthly-activity/monthly-activity.component';

const routes: Routes = [
  { path: 'monthly-activity', component: MonthlyActivityComponent },
  { path: 'activity-year-month/:year/:month', component: ActivityYearMonthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
