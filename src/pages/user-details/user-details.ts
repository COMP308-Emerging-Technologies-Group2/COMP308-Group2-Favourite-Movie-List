import { Component } from "@angular/core";
import { UserSettingsModel } from "../../models/user-settings";
import { UserSettingsProvider } from "../../providers/user-settings";
import { Loading, LoadingController, NavParams, NavController } from "ionic-angular";
import { UpdateUserProfilePage } from "../update-user-profile/update-user-profile";

// !!! Move to friend's list page
import { FavoritesPage } from "../favorites/favorites"

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  loading: Loading;
  userSettings: UserSettingsModel;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public us: UserSettingsProvider) {
  }

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
          if (subscription !== undefined) {
            subscription.unsubscribe();
          }
          this.loading.dismiss();
        });
      } else {
        this.loading.dismiss();
      }
    });
  }

  showUpdateUserProfilePage() {
    this.navCtrl.push(UpdateUserProfilePage, { userId: this.navParams.get('userId') });
  }

  // !!! Move to friend's list page
  showFriendsFavorites(userIdParam: string) {
    this.navCtrl.push(FavoritesPage, {userId: userIdParam});
  }
}
