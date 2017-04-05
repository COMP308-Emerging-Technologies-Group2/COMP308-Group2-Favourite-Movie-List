import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import angularfire 
import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Favorites page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  public favorites: FirebaseListObservable<any>;
  public userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire) {
    this.af.auth.subscribe(auth => this.userId = auth.uid);
    this.favorites = af.database.list('/users-favorites/' + this.userId + '/');
    
    this.favorites.forEach(element => {
      console.log(element);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
}
