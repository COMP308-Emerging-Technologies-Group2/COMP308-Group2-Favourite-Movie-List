/**
 * File Name:     pages/user-details/user-details.ts
 * Description:   Logic component of user-details page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from "@angular/core";
import { UserSettingsModel } from "../../models/user-settings";
import { UserSettingsProvider } from "../../providers/user-settings";
import { Loading, LoadingController, NavParams, NavController } from "ionic-angular";
import { UpdateUserProfilePage } from "../update-user-profile/update-user-profile";

/**
 * Contains logic for user details page
 * 
 * @export
 * @class UserDetailsPage
 */
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  loading: Loading;
  userSettings: UserSettingsModel;

  /**
   * Creates an instance of UserDetailsPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {LoadingController} loadingCtrl 
   * @param {UserSettingsProvider} us 
   * 
   * @memberOf UserDetailsPage
   */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public us: UserSettingsProvider) {
  }

  /**
   * Actions to perform when page is loaded
   * 
   * 
   * @memberOf UserDetailsPage
   */
  ionViewDidEnter() {
    this.loading = this.loadingCtrl.create({ content: 'Getting user\'s data...' });

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
   * Method to handle navigation to update user profile page
   * 
   * 
   * @memberOf UserDetailsPage
   */
  showUpdateUserProfilePage() {
    this.navCtrl.push(UpdateUserProfilePage, { userId: this.navParams.get('userId') });
  }

}
