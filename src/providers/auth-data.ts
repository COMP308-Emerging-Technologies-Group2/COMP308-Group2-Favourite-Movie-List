import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {AngularFire} from "angularfire2";
import firebase from "firebase";

@Injectable()
export class AuthData {
  fireAuth: any;

  constructor(public af: AngularFire) {
    af.auth.subscribe(user => {
      if (user) {
        this.fireAuth = user.auth;
      }
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

  register(email: string, password: string): firebase.Promise<any> {
    return this.af.auth.createUser({email, password});
  }
}
