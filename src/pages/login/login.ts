import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { EmitterService } from '../../core/emitter.service';

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
    // EmitterService
    //   .get("USER_LOGGEDIN")
    //   .subscribe((result) => {
    //     if (result) {
    //       this.navCtrl.setRoot('TabsPage');
    //     }
    //     else {
    //       this.navCtrl.setRoot('LoginPage')
    //     }
    //   });
  }

  ionViewWillEnter() {
    if (this.auth.loggedIn) {
      this.navCtrl.setRoot('TabsPage');
    }
  }

}
