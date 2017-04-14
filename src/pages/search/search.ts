/**
 * File Name:     pages/search/search.ts
 * Description:   Logic component of search page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { MovieDetailsPage } from '../movie-details/movie-details';
import { SearchProvider } from '../../providers/search';


/**
 * Contains logic for search page (searching for a movie)
 * 
 * @export
 * @class SearchPage
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [SearchProvider]
})
export class SearchPage {

  public searchResults: Array<Object>;
  private query: string;
  
  /**
   * Creates an instance of SearchPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {Http} http 
   * @param {SearchProvider} search 
   * 
   * @memberOf SearchPage
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
    this.query = event.target.value;
    this.search.getSearchResults(this.query).then(value => {
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
