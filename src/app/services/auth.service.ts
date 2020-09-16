import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment'

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userInfo: User;

  constructor(
    private http: HttpClient,
  ) {
    this.getUserProfile();
  }

  loginWithGoogle() {
    let loggedIn = new BehaviorSubject<Boolean>(false)

    this.googleLogin().subscribe((userInfo : User) => {
      console.log(userInfo);
      this.http.post(`${environment.apiAddress}/auth/authorize`, userInfo)
      .subscribe((resp: any) => {
        this.userInfo = userInfo;
        console.log('Successful login', resp.token);
        this.saveToken(resp.token)
        loggedIn.next(true)
      }, (errorResp) => {
        console.log('Error', errorResp);
        loggedIn.next(false);
      });
    });
    return loggedIn
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
    this.destroyToken();
    this.userInfo = undefined;
  }

  getUserInfo() : User {
    return this.userInfo;
  }

  getUserProfile() {
    this.http.get(`${environment.apiAddress}/auth/me`, {
      headers: this.buildHeaders(),
      responseType: 'json'
    })
    .subscribe((userInfo: User) => {
      console.log('User profile', userInfo);
      this.userInfo = userInfo;
    }, (errorResp) => {
      console.log('Error', errorResp);
    });
  }

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  buildHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    if(this.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.getToken()}`;
    }

    return new HttpHeaders(headersConfig);
  }
}
