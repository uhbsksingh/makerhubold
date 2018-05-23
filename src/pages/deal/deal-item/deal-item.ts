import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-deal-item',
  templateUrl: 'deal-item.html',
})
export class DealItemPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
