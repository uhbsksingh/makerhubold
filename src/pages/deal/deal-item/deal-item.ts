import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Item } from '../../../providers/item/item.model';
import { ItemService } from '../../../providers/item/item.service';

@IonicPage()
@Component({
  selector: 'page-deal-item',
  templateUrl: 'deal-item.html',
})
export class DealItemPage {

  items: Item[] = new Array<Item>();

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,

    private itemService: ItemService
  ) {
    this.loadItems();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  loadItems() {
    this.itemService.getAll().subscribe(
      result => {
        if (result)
          this.items = result;
      },
      err => {

      });
  }

  openDealItemActionPage(data: Item) {
    this.navCtrl.push("DealItemActionPage", data);
  }

}
