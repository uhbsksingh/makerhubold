import { Component } from '@angular/core';
import { Collection } from '../../providers/collection/collection.model';
import { CollectionService } from '../../providers/collection/collection.service';

/**
 * Generated class for the CurrentCollectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'current-collection',
  templateUrl: 'current-collection.html'
})
export class CurrentCollectionComponent {

  collection: Collection = new Collection();

  constructor(
    private collectionService: CollectionService
  ) {

  }

  loadCollection() {
    this.collectionService.getCurrentCollection().subscribe(
      result => {
        this.collection = result
      }
    );
  }

}
