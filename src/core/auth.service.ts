import { Injectable, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';
import { CONFIG } from './config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from '../providers/app-user.model';

const AUTH_CONFIG = {
  // Needed for Auth0 (capitalization: ID):
  clientID: 'cBtTN8f4KrBQ7P48nvRAdTIQ26tfJW8M',
  // Needed for Auth0Cordova (capitalization: Id):
  clientId: 'cBtTN8f4KrBQ7P48nvRAdTIQ26tfJW8M',
  domain: 'absk.auth0.com',
  packageIdentifier: 'com.absk.makerhub'
};

@Injectable()
export class AuthService {

  Auth0 = new auth0.WebAuth(AUTH_CONFIG);
  Client = new Auth0Cordova(AUTH_CONFIG);
  accessToken: string;
  idToken: string;
  user: any;
  loggedIn: boolean;
  loading = true;

  constructor(
    private storage: Storage,
    private httpClient: HttpClient,

    public zone: NgZone,
    public events: Events
  ) {
    this.storage.get('profile').then(user => this.user = user);
    this.storage.get('access_token').then(token => this.accessToken = token);
    this.storage.get('id_token').then(token => this.idToken = token);
    this.storage.get('expires_at').then(exp => {
      this.loggedIn = Date.now() < JSON.parse(exp);
      this.loading = false;
    });
  }

  loginForTest() {
    // Set access token
    this.storage.set('access_token', 'hBMIuyMlJ-yV_reP6F0LOzNjmuPP9Ooe');
    this.accessToken = 'hBMIuyMlJ-yV_reP6F0LOzNjmuPP9Ooe';
    this.storage.set('id_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EZzNOekpDUVRZMU1qWkJPVVZGTWtWR016ZEVSVVZGT0RVeVJVWkdNak0xTWpnek1VRTFSQSJ9.eyJnaXZlbl9uYW1lIjoiQWJoaXNoZWsiLCJmYW1pbHlfbmFtZSI6IlNpbmdoIiwibmlja25hbWUiOiJzaW5naC5tYWhhcnpuIiwibmFtZSI6IkFiaGlzaGVrIFNpbmdoIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tdUJnZ0syd0FuM3MvQUFBQUFBQUFBQUkvQUFBQUFBQUFKREkvN0k4LTdOeUJmc1EvcGhvdG8uanBnIiwiZ2VuZGVyIjoibWFsZSIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDYtMTlUMTY6NDk6MjcuNzg4WiIsImVtYWlsIjoic2luZ2gubWFoYXJ6bkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hYnNrLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMzYzMzg0MDQ1ODA4NTkzNzY5NyIsImF1ZCI6ImNCdFROOGY0S3JCUTdQNDhudlJBZFRJUTI2dGZKVzhNIiwiaWF0IjoxNTI5NDI2OTY4LCJleHAiOjE1Mjk0NjI5Njh9.gY8tNy_yubER_6hpqW_Fwcs6LSTnpKxWMId8sJzQn0uSGFOIx9cPyVeAhmg6TzbQ_LkJHxOs9umw8iCDxuU_oblSmzUxzENeC7TdNDSMKiifeDsbF7dgyhbVE6DeZn1rGdxE65G5EvzHQMjmeHSbYBHnL-T2hpH959eb_mu_M8AbEHoxLnylfI9dIHj3Begn_cneywUFcqObNLEMQiZVRhZRuf15ctGaoaIaQp89JZlG57Ofn8gqCsvUBRoZcOMYbDLXtyN_V7ooAMUv8iDZT-UO8RvxUGSQqXje3_5K0-Rx_kFIr9bNYPHKEZwV07ABGJjdpyU-RyC86ni5GxxnbQ');
    this.idToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EZzNOekpDUVRZMU1qWkJPVVZGTWtWR016ZEVSVVZGT0RVeVJVWkdNak0xTWpnek1VRTFSQSJ9.eyJnaXZlbl9uYW1lIjoiQWJoaXNoZWsiLCJmYW1pbHlfbmFtZSI6IlNpbmdoIiwibmlja25hbWUiOiJzaW5naC5tYWhhcnpuIiwibmFtZSI6IkFiaGlzaGVrIFNpbmdoIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tdUJnZ0syd0FuM3MvQUFBQUFBQUFBQUkvQUFBQUFBQUFKREkvN0k4LTdOeUJmc1EvcGhvdG8uanBnIiwiZ2VuZGVyIjoibWFsZSIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDYtMTlUMTY6NDk6MjcuNzg4WiIsImVtYWlsIjoic2luZ2gubWFoYXJ6bkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hYnNrLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMzYzMzg0MDQ1ODA4NTkzNzY5NyIsImF1ZCI6ImNCdFROOGY0S3JCUTdQNDhudlJBZFRJUTI2dGZKVzhNIiwiaWF0IjoxNTI5NDI2OTY4LCJleHAiOjE1Mjk0NjI5Njh9.gY8tNy_yubER_6hpqW_Fwcs6LSTnpKxWMId8sJzQn0uSGFOIx9cPyVeAhmg6TzbQ_LkJHxOs9umw8iCDxuU_oblSmzUxzENeC7TdNDSMKiifeDsbF7dgyhbVE6DeZn1rGdxE65G5EvzHQMjmeHSbYBHnL-T2hpH959eb_mu_M8AbEHoxLnylfI9dIHj3Begn_cneywUFcqObNLEMQiZVRhZRuf15ctGaoaIaQp89JZlG57Ofn8gqCsvUBRoZcOMYbDLXtyN_V7ooAMUv8iDZT-UO8RvxUGSQqXje3_5K0-Rx_kFIr9bNYPHKEZwV07ABGJjdpyU-RyC86ni5GxxnbQ';

    // Set access token expiration
    const expiresAt = JSON.stringify((86400 * 1000) + new Date().getTime());
    this.storage.set('expires_at', expiresAt);
    this.loggedIn = true;
    this.storage.set('profile', {
      "sub": "google-oauth2|113633840458085937697",
      "given_name": "Abhishek",
      "family_name": "Singh",
      "nickname": "singh.maharzn",
      "name": "Abhishek Singh",
      "picture": "https://lh6.googleusercontent.com/-uBggK2wAn3s/AAAAAAAAAAI/AAAAAAAAJDI/7I8-7NyBfsQ/photo.jpg",
      "gender": "male",
      "locale": "en",
      "updated_at": "2018-06-05T19:32:04.949Z",
      "email": "singh.maharzn@gmail.com",
      "email_verified": true
    }).then(() => {
      // EmitterService.get("USER_REGISTERED").emit(true);
    });

  }

  login() {
    this.loading = true;
    const options = {
      scope: 'openid profile offline_access email'
    };
    // Authorize login request with Auth0: open login page and get auth results
    this.Client.authorize(options, (err, authResult) => {
      if (err) {
        throw err;
      }
      // Set access token
      this.storage.set('access_token', authResult.accessToken);
      this.accessToken = authResult.accessToken;
      this.storage.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

      // Set access token expiration
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.storage.set('expires_at', expiresAt);
      // Set logged in
      this.loggedIn = true;
      // Fetch user's profile info
      this.Auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (err) {
          throw err;
        }
        this.storage.set('profile', profile).then(val => {
          this.zone.run(() => {
            this.user = profile;

            this.getCurrentUser(profile.sub);

          });

        });
      });

    });
  }

  setAppUser(appUser: any) {
    this.storage.set('appUser', appUser);
  }

  getAppUser() {
    this.storage.get('appUser');
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.storage.remove('expires_at');
    this.accessToken = null;
    this.user = null;
    this.loggedIn = false;

    this.events.publish("USER_LOGGEDIN", false);
  }

  getCurrentUser(externalId: string) {
    return this.httpClient.get<any>([
      CONFIG.apiUrl,
      "User",
      externalId
    ].join("/"))
      .subscribe(result => {
        if (result) {
          this.setAppUser(result);
          this.events.publish("USER_REGISTERED", true);
        }
        else {
          console.log("Not registered");
          this.events.publish("USER_REGISTERED", false);
        }
      });
  }

  registerUser(data: AppUser) {
    return this.httpClient
      .post<AppUser>([
        CONFIG.apiUrl,
        "User",
      ].join("/"), data, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        });
  }
}
