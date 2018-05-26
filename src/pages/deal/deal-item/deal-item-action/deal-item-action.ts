import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImageUploadComponent } from '../../../../components/image-upload/image-upload';
import { Item } from '../../../../providers/item/item.model';

@IonicPage()
@Component({
  selector: 'page-deal-item-action',
  templateUrl: 'deal-item-action.html',
})
export class DealItemActionPage {

  @ViewChild(ImageUploadComponent)
  private imageUploadComponent: ImageUploadComponent;

  item: Item;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,

    private navParams: NavParams
  ) {
    this.item = this.navParams.data;
  }

  ngAfterViewInit() {
    console.log("this.item deal item action", this.item)
    this.imageUploadComponent.imageDetails = this.item.itemImages;
  }

  sendDealItem() {
    console.log("sendDealItem", this.item);
    this.navCtrl.getPrevious(this.viewCtrl).dismiss();
    this.navCtrl.popTo("DealDetailPage");
  }

}