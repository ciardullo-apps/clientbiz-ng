import { Injectable } from '@angular/core';
import { User } from '../model/user';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userInfo: User;

  constructor() {
    gapi.load('auth2', function () {
             gapi.auth2.init()
          });
  }

  googleLogin() {
        let googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.then(() => {
           googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
              this.userInfo = {
                id: googleUser.getBasicProfile().getId(),
                firstName: googleUser.getBasicProfile().getGivenName(),
                lastName: googleUser.getBasicProfile().getFamilyName(),
                email: googleUser.getBasicProfile().getEmail(),
                photo: googleUser.getBasicProfile().getImageUrl()
              }
              console.log(this.userInfo);
           });
        });
     }

  isLoggedIn() : boolean {
    return !!this.userInfo;
  }

  logout() : void {
    this.userInfo = undefined;
  }
}
