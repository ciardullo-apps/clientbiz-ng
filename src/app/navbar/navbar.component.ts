import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  loginWithGoogle() : void {
    this.authService.loginWithGoogle();
  }

  logout() : void {
    this.authService.logout();
  }

  getUserProfile() {
    this.authService.getUserProfile();
  }
}
