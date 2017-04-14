/**
 * File Name:     pages/update-user-profile/update-user-profile.ts
 * Description:   Logic component of update-user-profile page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Loading, NavController, AlertController, LoadingController, NavParams} from "ionic-angular";
import {AuthData} from "../../providers/auth-data";
import {EmailValidator} from "../../validators/email";
import {UserSettingsModel} from "../../models/user-settings";
import {UserSettingsProvider} from "../../providers/user-settings";

/**
 * Contains logic to update user profiles
 * 
 * @export
 * @class UpdateUserProfilePage
 */
@Component({
  selector: 'page-update-user-profile',
  templateUrl: 'update-user-profile.html'
})
export class UpdateUserProfilePage {
  profileForm: FormGroup;
  userSettings: UserSettingsModel;
  loading: Loading;

  /**
   * Creates an instance of UpdateUserProfilePage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {AlertController} alertCtrl 
   * @param {LoadingController} loadingCtrl 
   * @param {FormBuilder} formBuilder 
   * @param {AuthData} authData 
   * @param {UserSettingsProvider} us 
   * 
   * @memberOf UpdateUserProfilePage
   */
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              public authData: AuthData,
              public us: UserSettingsProvider) {
  }

  /**
   * Action to perform when the page is loaded
   * 
   * 
   * @memberOf UpdateUserProfilePage
   */
  ionViewDidEnter() {
    this.loading = this.loadingCtrl.create({content: 'Getting user\'s data...'});

    const userId = this.navParams.get('userId');

    this.loading.present().then(() => {
      if (userId) {
        let subscription = this.us.getUserSettings(userId).subscribe(userSettings => {
          // TODO: find more elegant way to handle userSettings instantiation
          this.userSettings = new UserSettingsModel('', '');
          for (let property in userSettings) {
            if (userSettings.hasOwnProperty(property)) {
              this.userSettings[property.substr(1, property.length)] = userSettings[property];
            }
          }

          this.profileForm = this.formBuilder.group({
            email: [this.userSettings.email, Validators.compose([Validators.required, EmailValidator.isValid])],
            displayName: [this.userSettings.displayName, Validators.compose([Validators.required])]
          });

          if (subscription) {
            subscription.unsubscribe();
          }
          this.loading.dismiss();
        });
      } else {
        this.loading.dismiss();
      }
    });
  }

  /**
   * Method to handle user profile update events
   * 
   * 
   * @memberOf UpdateUserProfilePage
   */
  updateUserProfile() {
    if (!this.profileForm.valid) {
      this.alertCtrl.create({
        message: 'Please, fill in required data with valid values.',
        buttons: [{text: "Ok", role: 'cancel'}]
      }).present();
    } else {
      let userSettings: UserSettingsModel =
        new UserSettingsModel(this.profileForm.value.email, this.profileForm.value.displayName);

      this.loading = this.loadingCtrl.create();
      this.loading.present().then(() => {
        if (this.userSettings.email !== userSettings.email) {
          this.authData.authState.auth.updateEmail(userSettings.email)
            .then(() => {
              this.updateUserSettings(userSettings);
            }, error => {
              this.loading.dismiss().then(() => {
                this.alertCtrl.create({
                  message: error.message,
                  buttons: [{text: "Ok", role: 'cancel'}]
                }).present();
              });
            })
        } else {
          this.updateUserSettings(userSettings);
        }
      });
    }
  }

  private updateUserSettings(userSettings: UserSettingsModel) {
    this.us.updateUserSettings(this.authData.authState.uid, userSettings)
      .then(() => {
        this.loading.dismiss().then(() => this.navCtrl.pop());
      }, error => {
        let message = error && error.message ? error.message : error;

        this.loading.dismiss().then(() => {
          this.alertCtrl.create({
            title: 'Profile Update Failure',
            message: `${message}`,
            buttons: [{text: "Ok", role: 'cancel'}]
          }).present();
        });
      });
  }
}
