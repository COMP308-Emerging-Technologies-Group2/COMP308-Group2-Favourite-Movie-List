import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
/*
  Generated class for the EpisodeDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-episode-details',
  templateUrl: 'episode-details.html'
})
export class EpisodeDetailsPage {
  private episode: any;
  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
    let episode = this.navParams.get('episode');
    this.http.get(this.imdbApiUrl + '/id/' + episode.imdbid).map(res => res.json()).subscribe(
      data => {
        this.episode = data;
        this.episode['released'] = episode.released;
        console.log(this.episode);
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EpisodeDetailsPage');
  }

}
