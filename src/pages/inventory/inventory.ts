import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentCollectionComponent } from '../../components/current-collection/current-collection';
import { ItemService } from '../../providers/item/item.service';
import { Item } from '../../providers/item/item.model';
import { EmitterService } from '../../core/emitter.service';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  @ViewChild(CurrentCollectionComponent)
  private currentCollectionComponent: CurrentCollectionComponent;

  items: Item[] = new Array<Item>();
  rows: Array<Array<Item>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private itemService: ItemService
  ) {
    this.loadItems();

    EmitterService
      .get("ITEM_ADD")
      .subscribe(
        (deals: Item[]) => {
          this.loadItems();
        });
  }

  ngAfterViewInit() {
    this.currentCollectionComponent.loadCollection();
  }

  openAddInventoryPage() {
    this.navCtrl.push("AddInventoryPage");
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

}
