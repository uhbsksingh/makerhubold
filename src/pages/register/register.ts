import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { AppUser } from '../../providers/app-user.model';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private appUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService
  ) {
    this.appUser = this.formBuilder.group({
      appUserMobile: ['', Validators.required]
    });
  }

  register() {
    var newAppUser = new AppUser();

    console.log("this.auth.user", this.auth.user);

    newAppUser.externalId = this.auth.user.sub;
    newAppUser.appUserMobile = this.appUser.value.appUserMobile;
    //     newAppUser.profileImage = result.profileImage;

    this.auth.registerUser(newAppUser).subscribe(
      result => {
        this.auth.getCurrentUser(this.auth.user.sub);
      },
      err => {
      }
    );
  }

}
