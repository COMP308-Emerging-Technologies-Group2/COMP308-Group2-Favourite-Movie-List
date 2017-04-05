import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// import angularfire
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html'
})
export class MovieDetailsPage {

  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';
  public media;
  public favorites: FirebaseListObservable<any[]>;
  public userId: string;
  public value: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private http:Http,
  public af: AngularFire,
  public alertCtrl: AlertController) {

    // This might have to be in the ionViewDidLoad place
    this.af.auth.subscribe(auth => this.userId = auth.uid);
    this.favorites = af.database.list('/users-favorites/' + this.userId);
    this.value = af.database.object(this.userId);

    this.media = {};

    let id: string = this.navParams.get('id');

    console.log(id);
    this.http.get(this.imdbApiUrl+'/id/'+id).map(res => res.json()).subscribe(
      data => {
        console.log(data);
        this.media = data;
        if(data['_episodes']){
          console.log('there are _episodes');
        }
      }
    );
  }

  public AddToFavorites() : void {

    console.log(this.userId);
    console.log(this.media.imdbid);
    
    this.favorites.push({
      imdbID: this.media.imdbid,
      public: true
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetailsPage');
  }

}
