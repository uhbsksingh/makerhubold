import { NgModule } from '@angular/core';
import { CurrentCollectionComponent } from './current-collection/current-collection';
import { IonicModule } from 'ionic-angular';
import { ImageUploadComponent } from './image-upload/image-upload';
import { CollectionServiceModule } from '../providers/collection/collection-service.module';
import { ItemDetailComponent } from './item-detail/item-detail';
import { ItemListComponent } from './item-list/item-list';
import { DealItemDetailComponent } from './deal-item-detail/deal-item-detail';

@NgModule({
	declarations: [
		CurrentCollectionComponent,
		ImageUploadComponent,
		ItemDetailComponent,
		ItemListComponent,
		DealItemDetailComponent
	],
	imports: [
		IonicModule,
		CollectionServiceModule
	],
	exports: [
		CurrentCollectionComponent,
		ImageUploadComponent,
		ItemDetailComponent,
		ItemListComponent,
		DealItemDetailComponent
	]
})
export class ComponentsModule { }
