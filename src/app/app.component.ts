import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';
import { EmitterService } from '../core/emitter.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "LoginPage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Add this function
    (<any>window).handleOpenURL = (url) => {
      Auth0Cordova.onRedirectUri(url);
    };

    EmitterService
      .get("USER_LOGGEDIN")
      .subscribe((result) => {
        if (result) {
          this.rootPage = "TabsPage";
        }
        else {
          this.rootPage = "LoginPage";
        }
      });
  }
}
