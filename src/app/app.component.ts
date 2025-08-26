import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ NavbarComponent, RouterOutlet, ]
})
export class AppComponent {
  title = 'clientbiz-ng';
}
