import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClientListComponent } from './client-list/client-list.component'
import { ClientDetailComponent } from './client-detail/client-detail.component'
import { AppointmentsComponent } from './appointments/appointments.component'
import { ReceivablesComponent } from './receivables/receivables.component';

const routes: Routes = [
  { path: 'clients',  component: ClientListComponent },
  { path: 'client/:id',  component: ClientDetailComponent },
  { path: 'client',  component: ClientDetailComponent },
  { path: 'appointments/:id', component: AppointmentsComponent },
  { path: 'receivables', component: ReceivablesComponent }
  // { path: '', redirectTo: '/clients', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
