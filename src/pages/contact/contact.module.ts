import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ContactPage } from './contact';
import { ContactService } from '../../providers/contact/contact.service';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        ContactPage
    ],
    imports: [
        IonicPageModule.forChild(ContactPage),
        ComponentsModule
    ],
    exports: [
        ContactPage
    ],
    providers: [
        ContactService
    ]
})
export class ContactPageModule { }