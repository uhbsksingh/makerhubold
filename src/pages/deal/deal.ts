import { Component } from '@angular/core';
import { IonicPage, PopoverController, NavController } from 'ionic-angular';
import { Deal } from '../../providers/deal/deal.model';
import { DealService } from '../../providers/deal/deal.service';
import { EmitterService } from '../../core/emitter.service';

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
        console.log("loadDeals", result);
        this.deals = result
      },
      err => {
        this.error = err;
      });
  }

  openDealDetailPage(deal: Deal) {

    console.log("openDealDetailPage", deal);
    this.navCtrl.push("DealDetailPage", deal);
  }

  public presentPopover(ev) {

    let popover = this.popOverCtrl.create("AddMenuPopoverPage");

    popover.present({
      ev: ev
    });
  }

}
