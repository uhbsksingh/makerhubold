import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import { Item, ImageDetail } from '../../../providers/item/item.model';
import { ItemService } from '../../../providers/item/item.service';
import { EmitterService } from '../../../core/emitter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-add-inventory',
  templateUrl: 'add-inventory.html',
})
export class AddInventoryPage {

  itemForm: FormGroup;
  imageDetailId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {

    this.itemForm = this.formBuilder.group({
      itemName: ["", Validators.required],
      height: [],
      weight: [],
      itemQuantity: ["", Validators.required],
      tags: []
    });
  }

  public addItem() {
    var newItem: Item = this.itemForm.value;
    newItem.itemImages = new Array<ImageDetail>();

    var itemImage: ImageDetail = new ImageDetail();

    console.log("this.imageDetailId", this.imageDetailId);
    console.log("parseInt(this.imageDetailId)", parseInt(this.imageDetailId));

    itemImage.imageId = parseInt(this.imageDetailId);
    itemImage.caption = newItem.itemName;

    newItem.itemImages.push(itemImage);

    console.log("newItem", newItem);

    this.itemService.add(newItem).subscribe(
      result => {
        EmitterService.get("ITEM_ADD").emit(newItem);
        this.navCtrl.pop();
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }

}
