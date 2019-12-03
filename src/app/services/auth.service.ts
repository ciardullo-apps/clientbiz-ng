import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';


declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userInfo: User;

  constructor() {
  }

  loginWithGoogle() {
    this.googleLogin().subscribe((userInfo : User) => {
      this.userInfo = userInfo;
      console.log(this.userInfo);
    });
  }

  private googleLogin () {
    return new Observable((observer) => {
    this.userInfo = gapi.load('auth2', function () {
             gapi.auth2.init()

        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.then(() => {
           googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
              observer.next({
                id: googleUser.getBasicProfile().getId(),
                firstName: googleUser.getBasicProfile().getGivenName(),
                lastName: googleUser.getBasicProfile().getFamilyName(),
                email: googleUser.getBasicProfile().getEmail(),
                photo: googleUser.getBasicProfile().getImageUrl()
              });
              observer.complete();
           });
        });
      });
      return {unsubscribe() {}};
    });
  }

  isLoggedIn() : boolean {
    return !!this.userInfo;
  }

  logout() : void {
    this.userInfo = undefined;
  }

  getUserInfo() : User {
    return this.userInfo;
  }
}
