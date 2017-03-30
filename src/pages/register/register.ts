import {Component} from "@angular/core";
import {NavController, Loading, AlertController, LoadingController} from "ionic-angular";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthData} from "../../providers/auth-data";
import {EmailValidator} from "../../validators/email";
import {Page1} from "../page1/page1";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              public authData: AuthData) {
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  registerUser() {
    if (!this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      let email = this.registerForm.value.email;
      let password = this.registerForm.value.password;

      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.authData.register(email, password)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(Page1);
          });
        }, error => {
          this.loading.dismiss().then(() => {
            this.alertCtrl.create({
              message: error.message,
              buttons: [{text: "Ok", role: 'cancel'}]
            }).present();
          });
        });
    }
  }
}
