import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Collection } from '../../../providers/collection/collection.model';

@IonicPage()
@Component({
  selector: 'page-deal-detail',
  templateUrl: 'deal-detail.html',
})
export class DealDetailPage {

  referencedCollectionDetail: Collection;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    // this.referencedCollectionDetail = navParams.get("referencedCollectionDetail");
    this.referencedCollectionDetail = navParams.data;

    console.log("this.referencedCollectionDetail", this.referencedCollectionDetail);
  }

  openAddDealItemModal() {
    let modal = this.modalCtrl.create("DealItemPage");
    modal.present();
  }

}
