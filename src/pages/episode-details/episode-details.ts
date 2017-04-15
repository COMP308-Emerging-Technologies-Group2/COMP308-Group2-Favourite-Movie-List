/**
 * File Name:     pages/episodes/episodes.ts
 * Description:   Logic component of episode details page
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
/**
 * Logic component of episode details page
 * 
 * @export
 * @class EpisodeDetailsPage
 */
@Component({
  selector: 'page-episode-details',
  templateUrl: 'episode-details.html'
})
export class EpisodeDetailsPage {

  public episode;
  public posterAvailable: boolean = true;
  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';

  /**
   * Creates an instance of EpisodeDetailsPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {Http} http 
   * 
   * @memberOf EpisodeDetailsPage
   */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
    this.episode = {};
    let episodeInfo = this.navParams.get('episode');
    this.http.get(this.imdbApiUrl + '/id/' + episodeInfo.imdbid).map(res => res.json()).subscribe(
      data => {
        this.episode = data;
        this.episode['released'] = episodeInfo.released;
        if (data['poster'] === 'N/A') {
          this.posterAvailable = false;
        }
        console.log(this.episode);
      });
  }

  /**
   * Event listener for loaded page event
   * 
   * 
   * @memberOf EpisodeDetailsPage
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad EpisodeDetailsPage');
  }

}
