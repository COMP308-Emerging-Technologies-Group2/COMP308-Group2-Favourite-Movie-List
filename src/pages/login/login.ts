import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController, Loading} from "ionic-angular";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {AuthData} from "../../providers/auth-data";
import {EmailValidator} from "../../validators/email";
import {ResetPasswordPage} from "../reset-password/reset-password";
import {RegisterPage} from "../register/register";
import {Page1} from "../page1/page1";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              public authData: AuthData) {
    this.loginForm = formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  loginUser() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.authData.login(email, password)
        .then(authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(Page1);
          });
        }, error => {
          this.loading.dismiss().then(() => {
            this.alertCtrl.create({
              message: error.message,
              buttons: [{text: 'Ok', role: 'Cancel'}]
            }).present();
          });
        });
    }
  }
}
