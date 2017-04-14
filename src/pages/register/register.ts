/**
 * File Name:     pages/register/register.ts
 * Description:   Logic component of user registration page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from "@angular/core";
import { NavController, Loading, AlertController, LoadingController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthData } from "../../providers/auth-data";
import { EmailValidator } from "../../validators/email";
import { HomePage } from "../home/home";
import { UserSettingsModel } from "../../models/user-settings";
import { EmailPasswordCredentials } from "angularfire2/auth";

/**
 * Contains logic of user registration page.
 * 
 * @export
 * @class RegisterPage
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registerForm: FormGroup;
  loading: Loading;

  /**
   * Creates an instance of RegisterPage.
   * @param {NavController} navCtrl 
   * @param {AlertController} alertCtrl 
   * @param {LoadingController} loadingCtrl 
   * @param {FormBuilder} formBuilder 
   * @param {AuthData} authData 
   * 
   * @memberOf RegisterPage
   */
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public authData: AuthData) {
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      displayName: ['', Validators.compose([Validators.required])]
    });
  }

  /**
   * Method to register a user (create a UserSettingsModel class and saving to DB)
   * 
   * 
   * @memberOf RegisterPage
   */
  registerUser() {
    if (!this.registerForm.valid) {
      if (this.registerForm.value.email === ""
        || this.registerForm.value.password === ""
        || this.registerForm.value.displayName === "") {
        this.alertCtrl.create({
          message: "Please enter your registation information",
          buttons: [{ text: 'Ok', role: 'Cancel' }]
        }).present();
      }
    } else {
      let credentials: EmailPasswordCredentials = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      let userSettings: UserSettingsModel =
        new UserSettingsModel(credentials.email, this.registerForm.value.displayName);

      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.authData.register(credentials, userSettings)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        }, error => {
          this.loading.dismiss().then(() => {
            this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: 'cancel' }]
            }).present();
          });
        });
    }
  }
}
