/**
 * File Name:     providers/user-settings.ts
 * Description:   A provider service that contains use account settings information and data
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {UserSettingsModel} from "../models/user-settings";

const userSettingsUrl = '/user-settings';

/**
 * Contains use account settings information and data
 * 
 * @export
 * @class UserSettingsProvider
 */
@Injectable()
export class UserSettingsProvider {
  constructor(public af: AngularFire) {
  }


  /**
   * Method to return user account settings
   * 
   * @param {string} userId 
   * @returns {FirebaseObjectObservable<UserSettingsModel>} 
   * 
   * @memberOf UserSettingsProvider
   */
  getUserSettings(userId: string): FirebaseObjectObservable<UserSettingsModel> {
    return this.af.database.object(`${userSettingsUrl}/${userId}`);
  }

  /**
   * Method to update user account settings
   * 
   * @param {string} userId 
   * @param {UserSettingsModel} userSettings 
   * @returns {firebase.Promise<void>} 
   * 
   * @memberOf UserSettingsProvider
   */
  updateUserSettings(userId: string, userSettings: UserSettingsModel): firebase.Promise<void>  {
    let collection = {};
    collection[userId] = userSettings;

    return this.af.database.object(userSettingsUrl).update(collection);
  }
}
