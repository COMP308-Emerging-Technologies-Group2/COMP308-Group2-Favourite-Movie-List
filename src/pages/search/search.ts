import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { MovieDetailsPage } from '../movie-details/movie-details';
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

  /**
   * 
   * @param navCtrl 
   * @param navParams 
   * @param http 
   * @param search 
   */
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private http: Http,
    private search: SearchProvider
  ) {
    this.searchResults = new Array<Object>();
  }

  ionViewDidLoad() { console.log('ionViewDidLoad SearchPage'); }

  /**
   * Search event handler
   * 
   * @param {any} event 
   * 
   * @memberOf SearchPage
   */
  public searchEvent(event): void {
    let query: string = event.target.value;
    this.search.getSearchResults(query).then(value => {
      this.searchResults = value;
      console.log(value);

    });
  }

  /**
   * Clear search results when 
   * user clicks on the x button
   * in the search field
   * 
   * @memberOf SearchPage
   */
  public onCancel(): void {
    this.searchResults = new Array<Object>(); 
   }

  /**
   * Push to details page
   * 
   * @param {string} id 
   * 
   * @memberOf SearchPage
   */
  public viewDetails(id: string) {
    this.navCtrl.push(MovieDetailsPage, {
      'id': id
    });
  }

}
