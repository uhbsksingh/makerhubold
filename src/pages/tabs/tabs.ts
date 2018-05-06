import { Component } from '@angular/core';

import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tabTransfers = "TransferPage";
  tabContacts = "ContactPage";
  tabHub = "HubPage";
  tabProfile = "ProfilePage";

  constructor() {

  }
}
