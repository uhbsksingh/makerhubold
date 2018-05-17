import { Injectable, NgZone } from '@angular/core';
import { Events } from 'ionic-angular/util/events';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';

const auth0Config = {
  // needed for auth0
  clientID: '91kRQZtfH5dRcdsqj3AnfSpCl7k6pwHJ',

  // needed for auth0cordova
  clientId: '91kRQZtfH5dRcdsqj3AnfSpCl7k6pwHJ',
  domain: 'absk.auth0.com',
  callbackURL: window.location.origin,
  packageIdentifier: 'com.absk.makerhub'
};

@Injectable()
export class AuthService {
  // public isAuthenticated: boolean;

  auth0 = new Auth0.WebAuth(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;

  constructor(
    private loader: LoaderService,
    private localStorageService: LocalStorageService,

    public zone: NgZone,
    public events: Events
  ) {

    this.user = this.localStorageService.getStorageVariable('profile');
    this.idToken = this.localStorageService.getStorageVariable('id_token');

  }

  private setIdToken(token) {
    this.idToken = token;
    this.localStorageService.setStorageVariable('id_token', token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.localStorageService.setStorageVariable('access_token', token);
  }

  private throwLoggedInEvent() {
    this.events.publish('user:loggedIn');
  }

  private throwLoggedOutEvent() {
    this.events.publish('user:loggedOut');
  }

  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  public login() {
    const client = new Auth0Cordova(auth0Config);

    const options = {
      scope: 'openid profile offline_access email'
    };

    this.loader.show();

    client.authorize(options, (err, authResult) => {

      if (err) {
        throw err;
      }

      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);

      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.localStorageService.setStorageVariable('expires_at', expiresAt);

      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.localStorageService.setStorageVariable('profile', profile);

        this.zone.run(() => {
          this.user = profile;

          this.loader.hide();

          this.throwLoggedInEvent();
        });
      });
    });
  }

  public logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');

    this.idToken = null;
    this.accessToken = null;
    this.user = null;

    this.throwLoggedOutEvent();
  }
}
