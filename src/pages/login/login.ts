/**
 * File Name:     pages/login/login.ts
 * Description:   Logic component of login page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController, Loading } from "ionic-angular";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthData } from "../../providers/auth-data";
import { EmailValidator } from "../../validators/email";
import { ResetPasswordPage } from "../reset-password/reset-password";
import { RegisterPage } from "../register/register";
import { HomePage } from "../home/home";

/**
 * Contains logic for home page
 * 
 * @export
 * @class LoginPage
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  loading: Loading;

  /**
   * Creates an instance of LoginPage.
   * @param {NavController} navCtrl 
   * @param {AlertController} alertCtrl 
   * @param {LoadingController} loadingCtrl 
   * @param {FormBuilder} formBuilder 
   * @param {AuthData} authData 
   * 
   * @memberOf LoginPage
   */
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

  /**
   * Method to navigate to reset password page
   * 
   * 
   * @memberOf LoginPage
   */
  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  /**
   * Method to handle user create account event
   * 
   * 
   * @memberOf LoginPage
   */
  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  /**
   * Method to handle user login event
   * 
   * 
   * @memberOf LoginPage
   */
  loginUser() {
    if (!this.loginForm.valid) {
      if (this.loginForm.value.email === ""
        || this.loginForm.value.password === "") {
        this.alertCtrl.create({
          message: "Please enter your credentials",
          buttons: [{ text: 'Ok', role: 'Cancel' }]
        }).present();
      }
    } else {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.authData.login(email, password)
        .then(authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        }, error => {
          this.loading.dismiss().then(() => {
            this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'Cancel' }]
            }).present();
          });
        });
    }
  }
}
