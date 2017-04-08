import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchUserProvider } from '../../providers/search-user';
import { FavoritesPage } from '../favorites/favorites';
import { FriendsListPage } from '../friends-list/friends-list';
// import angularfire
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
  providers: [SearchUserProvider]
})
export class SearchUserPage {

  public searchResults: Array<any>;
  public searchProperties: Array<string>;
  private query: string = "";
  public userId: string;
  public friendsList: FirebaseListObservable<any>;
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
    private search: SearchUserProvider,
    private af: AngularFire
  ) {
    this.searchResults = new Array<any>();
    this.searchProperties = ['_displayName', '_email'];
    this.af.auth.subscribe(auth => this.userId = auth.uid).unsubscribe();
    this.friendsList = af.database.list('/users-friends/' + this.userId);

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

  viewDetails(searchResult: any) {
    console.log("User Id: " + searchResult.$key);
    this.navCtrl.push(FavoritesPage, { userId: searchResult.$key });
  }

  addFriend(searchResult: any) {
    console.log("UserId to Add" + searchResult.$key);

    let check = this.checkIfExists(searchResult.$key);

    if (check == false) {
      this.friendsList.push({
        friendId: searchResult.$key
      }).then(() => {
        console.log("Successfully Added")
      }).catch(err => console.log(err));
      this.navCtrl.push(FriendsListPage);
    }

  }

  // method to check if a user already has a friend
  public checkIfExists(friendId: string): boolean {
    let check: boolean = false;
    this.friendsList.subscribe(data => {
      data.forEach(friend => {
        console.log(friend.$key);
        if (friend.$key == friendId) {
          check = true;
        }
      });
    });
    return check;
  }
}
