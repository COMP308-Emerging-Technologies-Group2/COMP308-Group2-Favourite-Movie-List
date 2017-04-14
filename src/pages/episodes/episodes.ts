/**
 * File Name:     pages/episodes/episodes.ts
 * Description:   Logic component of episodes page
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { EpisodeDetailsPage } from '../episode-details/episode-details';

/**
 * Logic component of episodes page
 * 
 * @export
 * @class EpisodesPage
 */
@Component({
  selector: 'page-episodes',
  templateUrl: 'episodes.html'
})
export class EpisodesPage {
  private episodes: any;
  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';

  /**
   * Creates an instance of EpisodesPage.
   * @param {NavController} navCtrl 
   * @param {Http} http 
   * @param {NavParams} navParams 
   * 
   * @memberOf EpisodesPage
   */
  constructor(public navCtrl: NavController,
    private http: Http,
    public navParams: NavParams) {

    let seriesId = this.navParams.get('seriesId');
    this.episodes = [];
    this.http.get(this.imdbApiUrl + '/id/' + seriesId + '/episodes').map(res => res.json()).subscribe(data => {
      data.forEach(element => {
        this.episodes.push(element);
      });
    });
    console.log(this.episodes);
  }

  /**
   * Event listener for loaded page event
   * 
   * 
   * @memberOf EpisodesPage
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad EpisodesPage');
  }

  /**
   * Navigator to episode details page
   * 
   * @param {*} episode 
   * 
   * @memberOf EpisodesPage
   */
  public reviewEpisode(episode: any) {
    this.navCtrl.push(EpisodeDetailsPage, {
      'episode': episode
    });
  }

  /**
   *  For later use, count number of seasons
   * 
   * @param {*} data 
   * @returns {Array<any>} 
   * 
   * @memberOf EpisodesPage
   */
  public countSeasons(data: any): Array<any> {
    return data.reduce(function (a, d) {
      if (a.indexOf(d.season) === -1) {
        a.push(d.season);
      }
      return a;
    }, []);
  }

}
