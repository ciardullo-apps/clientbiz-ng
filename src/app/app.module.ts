import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatFormFieldModule } from '@angular/material/form-field'
import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { NavbarComponent, ProfileDialogComponent } from './navbar/navbar.component';
import { ReceivablesComponent } from './receivables/receivables.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientDetailComponent,
    AppointmentsComponent,
    NavbarComponent,
    ProfileDialogComponent,
    ReceivablesComponent,
    AppointmentDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  entryComponents: [
    ProfileDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
