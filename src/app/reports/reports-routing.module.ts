import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyActivityComponent } from './monthly-activity/monthly-activity.component';

const routes: Routes = [
  { path: 'monthly-activity', component: MonthlyActivityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
