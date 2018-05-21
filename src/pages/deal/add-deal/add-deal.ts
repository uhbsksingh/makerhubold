import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService } from '../../../providers/contact/contact.service';
import { Contact } from '../../../providers/contact/contact.model';
import { DealService } from '../../../providers/deal-service/deal.service';
import { Deal } from '../../../providers/deal-service/deal.model';

@IonicPage()
@Component({
  selector: 'page-add-deal',
  templateUrl: 'add-deal.html',
})
export class AddDealPage {

  searchQuery: string = '';
  contacts: Contact[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private contactService: ContactService,
    private dealService: DealService
  ) {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAll().subscribe(
      result => {
        this.contacts = result
      });
  }

  getItems(ev: any) {

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.contacts = this.contacts.filter((contact) => {
        return (contact.referenceCollectionDetailName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.loadContacts();
    }

  }

  addDeal(contact: Contact) {

    var newDeal = new Deal();
    newDeal.CreatedByCollectionDetailId = contact.collectionDetailId;
    newDeal.ReferencedCollectionDetailId = contact.referenceCollectionDetailId;
    newDeal.AliasName = contact.referenceCollectionDetailName;

    this.dealService.add(newDeal).subscribe(
      result => {
        console.log("subscribeResult", result);
      }
    );

    this.navCtrl.pop();
  }

}
