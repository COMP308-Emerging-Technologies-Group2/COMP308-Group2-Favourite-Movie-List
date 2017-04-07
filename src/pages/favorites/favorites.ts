import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { MovieDetailsPage } from '../../pages/movie-details/movie-details';

// import angularfire 
import { AngularFire, FirebaseListObservable } from 'angularfire2';


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
  public favoritesList: FirebaseListObservable<any>;
  public movies: Array<any>;
  public userId: string;
  public favorites;
  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public http: Http) {
    this.movies = [];

    // favorites for userId
    this.userId = this.navParams.get('userId');
    console.log("UID for Favourites: " + this.userId);

    // Getting the value from the database
    this.af.database.list('/users-favorites/' + this.userId + '/').subscribe(data => {
      //console.log(data);
      data.forEach(element => {
        this.favorites = element;
        //console.log(element);
        this.http.get(this.imdbApiUrl + '/id/' + element.imdbID).map(res => res.json()).subscribe(movieData => {
          //console.log(movieData);
          if (movieData != null) {
            this.movies.push(movieData);
            // Sorting the favorites list
            this.movies.sort((a, b) => { return a['imdbid'].localeCompare(b['imdbid']) });
          }
        })
      })
    });
  }

  public viewDetails(id: string) {
    this.navCtrl.push(MovieDetailsPage, {
      'id': id
    });
  }

  public deleteMedia(id: string) {
    this.movies = [];
    let key: string = "";
    console.log(id);
    this.af.database.list('/users-favorites/' + this.userId + '/').subscribe(data => {
      //console.log(data);
      data.forEach(element => {
        if (element.imdbID == id) {
          key = element.$key;
          this.af.database.list('/users-favorites/' + this.userId + '/').remove(key).then(() => { console.log("Sucessfully Removed") }, err => { console.log(err) });
        }
      })
    }).unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
}
