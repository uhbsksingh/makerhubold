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
  grid: Array<Array<Item>>;

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

  ionViewLoaded() {

  }

  openAddInventoryPage() {
    this.navCtrl.push("AddInventoryPage");
  }

  loadItems() {
    this.itemService.getAll().subscribe(
      result => {
        if (result)
          this.items = result;

        this.grid = Array(Math.ceil(this.items.length / 2));

        let rowNum = 0; //counter to iterate over the rows in the grid

        for (let i = 0; i < this.items.length; i += 2) {

          this.grid[rowNum] = Array(2); //declare two elements per row

          if (this.items[i]) {
            this.grid[rowNum][0] = this.items[i]
          }

          if (this.items[i + 1]) { //repeat for the second image
            this.grid[rowNum][1] = this.items[i + 1]
          }

          rowNum++; //go on to the next row
        }
        console.log("this.items", this.items);
        console.log("this.grid", this.grid);
      },
      err => {

      });
  }

}
