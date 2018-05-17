import { Component } from '@angular/core';

import { IonicPage, ActionSheetController, ModalController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabDeals = "DealPage";
  tabContacts = "ContactPage";
  tabHub = "HubPage";
  tabProfile = "ProfilePage";

  constructor(
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {

  }

  public openSearchPage() {
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }

  public openAddMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Transfer',
          icon: 'add-circle',
          handler: () => {
            this.openAddTransferPage();
          }
        },
        {
          text: 'Contact',
          icon: 'person-add',
          handler: () => {
            this.openAddContactPage();
          }
        },
        {
          text: 'Inventory',
          icon: 'arrow-dropright-circle',
          handler: () => {
            this.openAddInventoryPage();
          }
        }
      ]
    });
    actionSheet.present();
  }

  private openAddTransferPage() {
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }

  private openAddContactPage() {
    let modal = this.modalCtrl.create('AddContactPage');
    modal.present();
  }

  private openAddInventoryPage() {
    let modal = this.modalCtrl.create('SearchPage');
    modal.present();
  }

}
