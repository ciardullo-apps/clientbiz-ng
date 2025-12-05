import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [ MatDialogModule, MatToolbarModule, MatIconModule, MatMenuModule, RouterLink ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  loginWithGoogle() : void {
    this.authService.loginWithGoogle()
      .subscribe(resp => {
        if(resp) {
          if (this.authService.getUserInfo()) {
            this.toastr.success(`Welcome ${this.authService.getUserInfo().firstName}` )
          }
        }
      })
  }

  logout() : void {
    this.authService.logout();
  }

  getUserProfile() {
    this.authService.getUserProfile();
  }

  openUserProfile() {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '300px',
      data: this.authService.getUserInfo()
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Profile dialog closed');
    })
  }
}

@Component({
  selector: 'profile-dialog',
  templateUrl: './profile-dialog.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
})
export class ProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userInfo: User) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
