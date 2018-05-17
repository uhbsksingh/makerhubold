import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Deal } from '../../providers/deal-service/deal.model';
import { DealService } from '../../providers/deal-service/deal-service';

@IonicPage()
@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html'
})
export class DealPage {
  deals: Deal[];

  constructor(
    public navCtrl: NavController,
    private dealService: DealService,
  ) {
    this.loadDeals();
  }

  loadDeals() {
    this.dealService.getAll().subscribe(data => this.deals = data);
  }

  //Lifecycle hooks

  // ngOnChanges(changes: any) {
  //   // Listen to the 'list'emitted event so as populate the model
  //   // with the event payload
  //   EmitterService.get(this.listId).subscribe((comments: Comment[]) => { this.loadComments() });
  // }

}
