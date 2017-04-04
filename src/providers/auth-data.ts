import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {AngularFire, FirebaseAuthState} from "angularfire2";
import firebase from "firebase";
import {UserModel} from "../models/user";

const userSettingsUrl = '/user-settings';

@Injectable()
export class AuthData {
  authState: FirebaseAuthState;

  constructor(public af: AngularFire) {
    af.auth.subscribe((auth: FirebaseAuthState) => {
      this.authState = auth;
    });
  }

  login(email: string, password: string): firebase.Promise<any> {
    return this.af.auth.login({email, password});
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout(): firebase.Promise<any> {
    return this.af.auth.logout();
  }

  register(user: UserModel): firebase.Promise<any> {
    return this.af.auth.createUser({email: user.email, password: user.password})
      .then(() => {
        let userSettings = {};
        userSettings[this.authState.uid] = {
          displayName: user.displayName
        };

        this.af.database.object(userSettingsUrl).update(userSettings);
      });
  }
}
