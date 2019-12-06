import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
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

  openUserProfile() {
    const dialogRef = this.dialog.open(ProfileDialog, {
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
  styleUrls: ['./navbar.component.css']
})
export class ProfileDialog {
  constructor(
    public dialogRef: MatDialogRef<ProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public userInfo: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
