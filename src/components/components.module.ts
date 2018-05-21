import { NgModule } from '@angular/core';
import { CurrentCollectionComponent } from './current-collection/current-collection';
import { CollectionService } from '../providers/collection/collection.service';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [
		CurrentCollectionComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		CurrentCollectionComponent
	],
	providers: [
		CollectionService
	]
})
export class ComponentsModule { }
