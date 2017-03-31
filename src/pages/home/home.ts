import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _popularMovieScrapperUrl = 'https://comp308-group2-imdb-scraper.herokuapp.com/';
  private loading:Loading;
  
  public mostPopularMovies = new Array<Object>();
  public mostPopularTV = new Array<Object>();
  public media='movies';

  constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private http:Http,
      private loadingCtrl: LoadingController
    )
  {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

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
  private _getTopMovies():void{
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
  private _getTopTv():void{
     
    this.http.get(this._popularMovieScrapperUrl + 'mostPopularTvs').subscribe(
      data => this.mostPopularTV = data.json()['mostPopularTvs'],
      err => console.log(err),
      ()=> this.loading.dismiss()      
    );
  }

  /**
   * View details for a movie or tv show
   * 
   * @param {string} id 
   * 
   * @memberOf HomePage
   */
  public viewDetails(id: string){
    //TODO goto details page here
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
