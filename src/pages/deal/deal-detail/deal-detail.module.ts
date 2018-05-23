import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealDetailPage } from './deal-detail';

@NgModule({
  declarations: [
    DealDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DealDetailPage),
  ],
})
export class DealDetailPageModule {}
