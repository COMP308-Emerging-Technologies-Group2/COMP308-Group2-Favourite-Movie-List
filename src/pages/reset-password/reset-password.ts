import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {AuthData} from "../../providers/auth-data";
import {EmailValidator} from "../../validators/email";

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder,
              public authData: AuthData) {
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    })
  }

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email)
        .then(user => {
          this.alertCtrl.create({
            message: "We just sent you a reset link to your email",
            buttons: [{
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          }).present();
        }, (error) => {
          this.alertCtrl.create({
            message: error.message,
            buttons: [{text: "Ok", role: 'cancel'}]
          }).present();
        });
    }
  }
}
