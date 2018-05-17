import { Component } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';
import { Deal } from '../../providers/deal-service/deal.model';
import { DealService } from '../../providers/deal-service/deal-service';

@IonicPage()
@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html'
})
export class DealPage {
  deals: Deal[];
  error: Error[];

  constructor(
    private dealService: DealService,
    private popOverCtrl: PopoverController
  ) {
    this.loadDeals();
  }

  loadDeals() {
    this.dealService.getAll().subscribe(
      result => {
        this.deals = result
      },
      err => {
        this.error = err;
      }
    );
  }

  public presentPopover(ev) {

    let popover = this.popOverCtrl.create("AddMenuPopoverPage");

    popover.present({
      ev: ev
    });
  }

  //Lifecycle hooks

  // ngOnChanges(changes: any) {
  //   // Listen to the 'list'emitted event so as populate the model
  //   // with the event payload
  //   EmitterService.get(this.listId).subscribe((comments: Comment[]) => { this.loadComments() });
  // }

}
