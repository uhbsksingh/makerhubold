import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilePage } from './profile';
import { CollectionServiceModule } from '../../providers/collection/collection-service.module';

@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        CollectionServiceModule
    ],
    exports: [
        ProfilePage
    ]
})
export class ProfilePageModule { }