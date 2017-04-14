import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { EpisodeDetailsPage } from '../episode-details/episode-details';

/*
  Generated class for the Episodes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-episodes',
  templateUrl: 'episodes.html'
})
export class EpisodesPage {
  private episodes: any;
  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EpisodesPage');
  }

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
