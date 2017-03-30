import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from '../../providers/search';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [SearchProvider]
})
export class SearchPage {

  public searchResults: Array<Object>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: Http,
    private search: SearchProvider
  ) {
    this.searchResults = new Array<Object>();
  }

  ionViewDidLoad() { console.log('ionViewDidLoad SearchPage'); }
  
  public searchEvent(event): void {
    let query: string = event.target.value;
    this.search.getSearchResults(query).then(value => {
      this.searchResults = value;
      console.log(value);
      
    })
  }

  public onCancel(): void { }

  public viewDetails(searchResult) {
    // push to details page
    // this.navCtrl.push
  }

}
