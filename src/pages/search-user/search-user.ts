import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchUserProvider } from '../../providers/search-user';

@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
  providers: [SearchUserProvider]
})
export class SearchUserPage {

  public searchResults: Array<any>;
  public searchProperties: Array<string>;
  private query: string = "";
  /**
   * 
   * @param navCtrl 
   * @param navParams 
  //  * @param http 
   * @param search 
   */
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    // private http: Http,
    private search: SearchUserProvider
  ) {
    this.searchResults = new Array<any>();
    this.searchProperties = ['_displayName', '_email']
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
    this.searchResults.length = 0; //empty array

    // unfortunately, firebase doesn't do search functions
    // so I'm looping through all search properties
    // and putting all objects in an array
    this.searchProperties.forEach(searchProperty =>
      this.search.getSearchResults(searchProperty, this.query).then(value => {
        if (typeof value !== 'undefined') {
          value.subscribe(data => {
            data.forEach(obj => {
              console.log(obj);
              this.searchResults.push(obj);
              console.log(this.searchResults.length);

            })
          })
        }
      }));
    // console.log (this.searchResults.length);
    // this.searchResults.forEach(member => {
    //   console.log(member);
    // });
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
  // public viewDetails(id: string) {
  //   this.navCtrl.push(MovieDetailsPage, {
  //     'id': id
  //   });
  // }

}
