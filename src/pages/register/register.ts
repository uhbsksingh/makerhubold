import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { AppUser } from '../../providers/app-user.model';
import { Registration } from '../../providers/registration.model';
import { Collection } from '../../providers/collection/collection.model';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registration: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService
  ) {
    this.registration = this.formBuilder.group({
      appUserMobile: ['', Validators.required],
      collectionName: ['', Validators.required]
    });
  }

  register() {
    var newAppUser = new AppUser();
    newAppUser.externalId = this.auth.user.sub;
    newAppUser.appUserMobile = this.registration.value.appUserMobile;
    //     newAppUser.profileImage = result.profileImage;

    var newCollection = new Collection();
    newCollection.collectionDetailName = this.registration.value.collectionName;

    var newRegistration = new Registration();
    newRegistration.appUserDetail = newAppUser;
    newRegistration.collectionDetail = newCollection;

    this.auth.registerUser(newRegistration).subscribe(
      result => {
        this.auth.getCurrentUser(this.auth.user.sub);
      },
      err => {
      }
    );
  }

}
