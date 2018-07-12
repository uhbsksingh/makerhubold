import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../core/auth.service';
import { CollectionService } from '../../providers/collection/collection.service';
import { Collection } from '../../providers/collection/collection.model';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  collections: Collection[];

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,

    private collectionService: CollectionService
  ) {
    this.loadCollection();
  }

  loadCollection() {
    this.collectionService.getAll().subscribe(
      result => {
        console.log("Collection list", result);
        this.collections = result;
      },
      err => {

      });
  }

}
