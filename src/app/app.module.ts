import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { MatInputModule, MatTableModule, MatToolbarModule, MatDialogModule } from '@angular/material';
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

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientDetailComponent,
    AppointmentsComponent,
    NavbarComponent,
    ProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [
    ProfileDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
