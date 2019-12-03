import { Injectable } from '@angular/core';
import { User } from '../model/user';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userInfo: User;

  constructor() {
  }

  googleLogin() {
    // Should be in constructor, moved here to facilitate testing.
    this.userInfo = gapi.load('auth2', function () {
             gapi.auth2.init()

        let googleAuth = gapi.auth2.getAuthInstance();
        return googleAuth.then(() => {
           googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
              return {
                id: googleUser.getBasicProfile().getId(),
                firstName: googleUser.getBasicProfile().getGivenName(),
                lastName: googleUser.getBasicProfile().getFamilyName(),
                email: googleUser.getBasicProfile().getEmail(),
                photo: googleUser.getBasicProfile().getImageUrl()
              }
           });
        });
      });
      console.log(this.userInfo);
     }

  isLoggedIn() : boolean {
    return !!this.userInfo;
  }

  logout() : void {
    this.userInfo = undefined;
  }
}
