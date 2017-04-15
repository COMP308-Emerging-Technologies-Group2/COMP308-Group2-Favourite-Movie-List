/**
 * File Name:     pages/home/home.ts
 * Description:   Logic component of home page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, LoadingController, Loading, Content } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';


import { MovieDetailsPage } from '../../pages/movie-details/movie-details';


/**
 * Contains logic for home page
 * 
 * @export
 * @class HomePage
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _popularMovieScrapperUrl = 'https://comp308-group2-imdb-scraper.herokuapp.com/';
  private loading: Loading;

  public mostPopularMovies = new Array<Object>();
  public mostPopularTV = new Array<Object>();
  public movieIndex: number;
  public tvIndex: number;
  public media = 'movies';

  @ViewChild(Content) list: Content;

  /**
   * Creates an instance of HomePage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {Http} http 
   * @param {AuthData} authData 
   * @param {LoadingController} loadingCtrl 
   * 
   * @memberOf HomePage
   */
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: Http,
    private authData: AuthData,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.movieIndex = 10;
    this.tvIndex = 10;

    this.mostPopularMovies = new Array<Object>();
    this.mostPopularTV = new Array<Object>();
    this._getTopMovies();
    this._getTopTv();
  }

  /**
   * Gets the most popular movies 
   * from IMDb
   * 
   * @private
   * 
   * @memberOf HomePage
   */
  private _getTopMovies(): void {
    this.http.get(this._popularMovieScrapperUrl + 'mostPopularMovies').subscribe(
      data => this.mostPopularMovies = data.json()['mostPopularMovies']
    );
  }

  /**
   * Gets the most popular tv
   * shows from IMDb
   * 
   * This function also closes
   * the loading 
   * 
   * @private
   * 
   * @memberOf HomePage
   */
  private _getTopTv(): void {

    this.http.get(this._popularMovieScrapperUrl + 'mostPopularTvs').subscribe(
      data => this.mostPopularTV = data.json()['mostPopularTvs'],
      err => console.log(err),
      () => this.loading.dismiss()
    );
  }

  /**
   * View details for a movie or tv show
   * 
   * @param {string} id 
   * 
   * @memberOf HomePage
   */
  public viewDetails(id: string) {
    console.log(this.authData.authState);
    
    if (this.authData.authState) {
      this.navCtrl.push(MovieDetailsPage, {
        'id': id
      });
    }

  }


  /**
   * Increments the movie or tv
   * indexes 
   * 
   * @param {any} infiniteScroll 
   * @param {string} media 
   * 
   * @memberOf HomePage
   */
  public doInfinite(infiniteScroll, media: string) {
    console.log(media);

    if (media === 'movies') {
      this.movieIndex += 10;
    }
    else if (media === 'tv') {
      this.tvIndex += 10;
    }

    infiniteScroll.complete();

  }


  /**
   * runs when the pages loads
   * 
   * @memberOf HomePage
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  /**
   * Scrolls the page up when user switches tabs
   * 
   * @memberOf HomePage
   */
  public changed() { this.list.scrollToTop(); }

}
