import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealItemPage } from './deal-item';

@NgModule({
  declarations: [
    DealItemPage,
  ],
  imports: [
    IonicPageModule.forChild(DealItemPage),
  ],
})
export class DealItemPageModule {}
