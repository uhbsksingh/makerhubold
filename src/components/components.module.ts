import { NgModule } from '@angular/core';
import { CurrentCollectionComponent } from './current-collection/current-collection';
import { IonicModule } from 'ionic-angular';
import { ImageUploadComponent } from './image-upload/image-upload';
import { CollectionServiceModule } from '../providers/collection/collection-service.module';
import { ItemDetailComponent } from './item-detail/item-detail';
import { ItemListComponent } from './item-list/item-list';

@NgModule({
	declarations: [
		CurrentCollectionComponent,
		ImageUploadComponent,
		ItemDetailComponent,
    ItemListComponent
	],
	imports: [
		IonicModule,
		CollectionServiceModule
	],
	exports: [
		CurrentCollectionComponent,
		ImageUploadComponent,
		ItemDetailComponent,
    ItemListComponent
	]
})
export class ComponentsModule { }
