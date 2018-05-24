import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DealPage } from './deal';
import { DealServiceModule } from '../../providers/deal/deal-service.module';

@NgModule({
    declarations: [
        DealPage
    ],
    imports: [
        IonicPageModule.forChild(DealPage),
        DealServiceModule
    ],
    exports: [
        DealPage
    ]
})
export class DealPageModule { }