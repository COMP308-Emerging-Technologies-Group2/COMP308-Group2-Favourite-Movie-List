import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

/*
 Generated class for the ResetPassword page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
