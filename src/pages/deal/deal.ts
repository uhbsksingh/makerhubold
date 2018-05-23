import { Component } from '@angular/core';
import { IonicPage, PopoverController, NavController } from 'ionic-angular';
import { Deal } from '../../providers/deal/deal.model';
import { DealService } from '../../providers/deal/deal.service';
import { EmitterService } from '../../core/emitter.service';
import { Collection } from '../../providers/collection/collection.model';

@IonicPage()
@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html'
})
export class DealPage {

  deals: Deal[];
  error: Error[];

  constructor(
    public navCtrl: NavController,

    private dealService: DealService,
    private popOverCtrl: PopoverController
  ) {
    this.loadDeals();

    EmitterService
      .get("DEAL_ADD")
      .subscribe(
        (deals: Deal[]) => {
          this.loadDeals(); 
        });
  }

  loadDeals() {
    this.dealService.getAll().subscribe(
      result => {
        console.log("result", result);
        this.deals = result
      },
      err => {
        this.error = err;
      });
  }

  openDealDetailPage(deal: Deal) {

    var referencedCollectionDetail: Collection = new Collection();
    referencedCollectionDetail.collectionDetailId = deal.referencedCollectionDetailId;
    referencedCollectionDetail.collectionDetailName = deal.aliasName;

    console.log("referencedCollectionDetail", referencedCollectionDetail);
    this.navCtrl.push("DealDetailPage", referencedCollectionDetail);
  }

  public presentPopover(ev) {

    let popover = this.popOverCtrl.create("AddMenuPopoverPage");

    popover.present({
      ev: ev
    });
  }

}
