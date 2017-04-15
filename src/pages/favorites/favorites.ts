/**
 * File Name:     pages/favorites/favorites.ts
 * Description:   Logic component of favorites page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { MovieDetailsPage } from '../../pages/movie-details/movie-details';

import { AngularFire } from 'angularfire2';
import "rxjs/add/operator/first";


/**
 * Contains logic for favorites page
 *
 * @export
 * @class FavoritesPage
 */
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  public movies: Array<any>;
  public userId: string;
  public favorites;
  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';

  /**
   * Creates an instance of FavoritesPage.
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {AngularFire} af
   * @param {Http} http
   *
   * @memberOf FavoritesPage
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public http: Http) {
    this.movies = [];

    // favorites for userId
    this.userId = this.navParams.get('userId');
    console.log("UID for Favourites: " + this.userId);

    // Getting the value from the database
    this._getUserFavorites();
  }


  /**
   * 
   */
  private _getUserFavorites():void{    
    this.af.database.list('/users-favorites/' + this.userId + '/').first().subscribe(data => {
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

  /**
   * Method that handles event when user clicks on one particular movie
   *
   * @param {string} id
   *
   * @memberOf FavoritesPage
   */
  public viewDetails(id: string) {
    this.navCtrl.push(MovieDetailsPage, {
      'id': id
    });
  }

  /**
   * Method that handles event when user deletes one particular movie from favorites
   *
   * @param {string} id
   *
   * @memberOf FavoritesPage
   */
  public deleteMedia(id: string) {
    this.movies = [];
    let key: string = "";
    console.log(id);
    this.af.database.list('/users-favorites/' + this.userId + '/').first().subscribe(data => {
      //console.log(data);
      data.forEach(element => {
        if (element.imdbID == id) {
          key = element.$key;
          this.af.database.list('/users-favorites/' + this.userId + '/').remove(key).then(() => {
            console.log("Sucessfully Removed");
            this._getUserFavorites();
            },
            err => { console.log(err) });
        }
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
}
