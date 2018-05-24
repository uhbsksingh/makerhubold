import { NgModule } from '@angular/core';
import { CurrentCollectionComponent } from './current-collection/current-collection';
import { IonicModule } from 'ionic-angular';
import { ImageUploadComponent } from './image-upload/image-upload';
import { CollectionServiceModule } from '../providers/collection/collection-service.module';

@NgModule({
	declarations: [
		CurrentCollectionComponent,
		ImageUploadComponent
	],
	imports: [
		IonicModule,
		CollectionServiceModule
	],
	exports: [
		CurrentCollectionComponent,
		ImageUploadComponent
	]
})
export class ComponentsModule { }
