import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentCollectionComponent } from '../../components/current-collection/current-collection';
import { ItemService } from '../../providers/item/item.service';
import { Item } from '../../providers/item/item.model';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  @ViewChild(CurrentCollectionComponent)
  private currentCollectionComponent: CurrentCollectionComponent;

  items: Item[] = new Array();
  grid: Array<Array<Item>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private itemService: ItemService
  ) {
    this.loadItems();
    this.grid = Array(Math.ceil(this.items.length / 2));
  }

  ngAfterViewInit() {
    this.currentCollectionComponent.loadCollection();
  }

  ionViewLoaded() {

    let rowNum = 0; //counter to iterate over the rows in the grid

    for (let i = 0; i < this.items.length; i += 2) { //iterate images

      this.grid[rowNum] = Array(2); //declare two elements per row

      if (this.items[i]) { //check file URI exists
        this.grid[rowNum][0] = this.items[i] //insert image
      }

      if (this.items[i + 1]) { //repeat for the second image
        this.grid[rowNum][1] = this.items[i + 1]
      }

      rowNum++; //go on to the next row
    }

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
