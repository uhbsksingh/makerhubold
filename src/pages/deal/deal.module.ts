import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DealPage } from './deal';
import { DealService } from '../../providers/deal-service/deal.service';

@NgModule({
    declarations: [
        DealPage
    ],
    imports: [
        IonicPageModule.forChild(DealPage)
    ],
    exports: [
        DealPage
    ],
    providers: [
        DealService
    ]
})
export class DealPageModule { }