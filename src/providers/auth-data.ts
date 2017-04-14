/**
 * File Name:     providers/auth-data.ts
 * Description:   A provider service that contains authentication methods and data
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {AngularFire, FirebaseAuthState} from "angularfire2";
import firebase from "firebase";
import {UserSettingsModel} from "../models/user-settings";
import {EmailPasswordCredentials} from "angularfire2/auth";
import {UserSettingsProvider} from "./user-settings";

/**
 * Contains authentication methods and data
 * 
 * @export
 * @class AuthData
 */
@Injectable()
export class AuthData {
  authState: FirebaseAuthState;


  /**
   * Creates an instance of AuthData.
   * @param {AngularFire} af 
   * @param {UserSettingsProvider} us 
   * 
   * @memberOf AuthData
   */
  constructor(public af: AngularFire, public us: UserSettingsProvider) {
    af.auth.subscribe((auth: FirebaseAuthState) => {
      this.authState = auth;
    });
  }

  // common authetication controls

  login(email: string, password: string): firebase.Promise<any> {
    return this.af.auth.login({email, password});
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout(): firebase.Promise<any> {
    return this.af.auth.logout();
  }

  register(credentials: EmailPasswordCredentials, userSettings: UserSettingsModel): firebase.Promise<any> {
    return this.af.auth.createUser(credentials)
      .then(() => this.us.updateUserSettings(this.authState.uid, userSettings));
  }
}
