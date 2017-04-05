import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html'
})
export class MovieDetailsPage {

  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';
  public media;
  public posterAvailable:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {

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
        if(data['poster']!=='N/A'){
          this.posterAvailable = true;
        }
        console.log('poster:' + this.posterAvailable);
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetailsPage');
  }

}
