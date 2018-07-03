import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public auth: AuthService
  ) {

  }

  ionViewWillEnter() {
    if (this.auth.loggedIn) {
      this.navCtrl.setRoot('TabsPage');
    }
  }

  login() {
    // this.auth.loginForTest();
    this.auth.login();
  }

}
