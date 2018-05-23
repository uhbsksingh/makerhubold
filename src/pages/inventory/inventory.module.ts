import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { ComponentsModule } from '../../components/components.module';
import { ItemService } from '../../providers/item/item.service';

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryPage),
    ComponentsModule
  ],
  providers: [
    ItemService
  ]
})
export class InventoryPageModule { }
