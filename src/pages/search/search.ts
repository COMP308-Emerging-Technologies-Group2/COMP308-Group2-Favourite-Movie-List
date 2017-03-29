import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public searchResults;

  constructor(private navCtrl: NavController, private navParams: NavParams, private http: Http) {
    this.searchResults = new Array<Object>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  public search(event): void {

    let query: string = event.target.value;

    if (typeof query !== 'undefined') {
      this.http.get(`https://v2.sg.media-imdb.com/suggests/${query[0]}/${query}.json`)
        .subscribe(data => this._parseResponse(data['_body'], query))
    }
    else {
      this.searchResults = [];
    }
  }

  public onCancel(): void { }

  private _parseResponse(imdbResponse: string, query: string): void {
    query = (query).split(' ').join('_')
    let jsonResponse = imdbResponse.replace(`imdb$${query}(`, '')
    jsonResponse = jsonResponse.substring(0, jsonResponse.length - 1);
    jsonResponse = JSON.parse(jsonResponse)
    jsonResponse = jsonResponse['d']
    this.searchResults = jsonResponse;

  }

}
