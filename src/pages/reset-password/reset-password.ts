/**
 * File Name:     pages/reset-password/reset-password.ts
 * Description:   Logic component of reset-password page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {AuthData} from "../../providers/auth-data";
import {EmailValidator} from "../../validators/email";

/**
 * Contains logic to handle password resets
 * 
 * @export
 * @class ResetPasswordPage
 */
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;

  /**
   * Creates an instance of ResetPasswordPage.
   * @param {NavController} navCtrl 
   * @param {AlertController} alertCtrl 
   * @param {FormBuilder} formBuilder 
   * @param {AuthData} authData 
   * 
   * @memberOf ResetPasswordPage
   */
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder,
              public authData: AuthData) {
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    })
  }

  /**
   * Method to reset password
   * 
   * 
   * @memberOf ResetPasswordPage
   */
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
