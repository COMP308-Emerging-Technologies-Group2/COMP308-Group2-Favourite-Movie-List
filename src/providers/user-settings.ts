import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {UserSettingsModel} from "../models/user-settings";

const userSettingsUrl = '/user-settings';

@Injectable()
export class UserSettingsProvider {
  constructor(public af: AngularFire) {
  }

  getUserSettings(userId: string): FirebaseObjectObservable<UserSettingsModel> {
    return this.af.database.object(`${userSettingsUrl}/${userId}`);
  }

  updateUserSettings(userId: string, userSettings: UserSettingsModel) {
    let collection = {};
    collection[userId] = userSettings;

    this.af.database.object(userSettingsUrl).update(collection);
  }
}
