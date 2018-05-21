import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Contact } from '../../providers/contact/contact.model';
import { ContactService } from '../../providers/contact/contact.service';
import { CurrentCollectionComponent } from '../../components/current-collection/current-collection';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts: Contact[];

  @ViewChild(CurrentCollectionComponent)
  private currentCollection: CurrentCollectionComponent;

  constructor(
    public navCtrl: NavController,

    private contactService: ContactService
  ) {
    this.loadContacts();
  }

  ngAfterViewInit() {
    this.currentCollection.loadCollection();
  }

  loadContacts() {
    this.contactService.getAll().subscribe(
      result => {
        this.contacts = result;
      },
      err => {

      });
  }

  openAddContactPage() {
    this.navCtrl.push("AddContactPage");
  }

}
