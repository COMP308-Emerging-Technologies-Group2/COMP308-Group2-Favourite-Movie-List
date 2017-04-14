/**
 * File Name:     pages/search-user/search-user.ts
 * Description:   Logic component of search-user page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SearchUserProvider } from '../../providers/search-user';
import { FavoritesPage } from '../favorites/favorites';
import { FriendsListPage } from '../friends-list/friends-list';
// import angularfire
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
 * Contains logic to search users
 * 
 * @export
 * @class SearchUserPage
 */
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
  private isSelfSearch: boolean = false;
  private isNoResults: boolean = false;
  public friendsList: FirebaseListObservable<any>;


  /**
   * Creates an instance of SearchUserPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {SearchUserProvider} search 
   * @param {AngularFire} af 
   * 
   * @memberOf SearchUserPage
   */
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    // private http: Http,
    private search: SearchUserProvider,
    private af: AngularFire,
    public alertCtrl: AlertController,
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
    this.isSelfSearch = false;
    if (this.query === '') {
      this.isNoResults = false;
    }
    else {
      this.isNoResults = true;
    }
    // unfortunately, firebase doesn't do search functions
    // so I'm looping through all search properties
    // and putting all objects in an array
    this.searchProperties.forEach(searchProperty =>
      this.search.getSearchResults(searchProperty, this.query).then(value => {
        if (typeof value !== 'undefined') {
          value.subscribe(data => {
            data.forEach(obj => {
              console.log(obj);
              if (obj.$key == this.userId) {
                this.isSelfSearch = true;
              }
              else {              
                this.searchResults.push(obj);
                this.isNoResults = false;
              }
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
   * Method to handle event when user views details of a particular user
   * 
   * @param {*} searchResult 
   * 
   * @memberOf SearchUserPage
   */
  viewDetails(searchResult: any) {
    console.log("User Id: " + searchResult.$key);
    this.navCtrl.push(FavoritesPage, { userId: searchResult.$key });
  }

  /**
   * Method to handle event when user adds a friend
   * 
   * @param {*} searchResult 
   * 
   * @memberOf SearchUserPage
   */
  addFriend(searchResult: any) {
    console.log("UserId to Add" + searchResult.$key);

    let check = this.checkIfExists(searchResult.$key);
    console.log("user exists? => " + check);

    if (check == false) {
      this.friendsList.push({
        friendId: searchResult.$key
      }).then(() => {
        console.log("Successfully Added")
      }).catch(err => console.log(err));
      this.navCtrl.push(FriendsListPage);
    }
    else
    {
      this.alertCtrl.create({
          message: searchResult._displayName + " is your friend already",
          buttons: [{ text: 'Ok', role: 'Cancel' }]
        }).present();
    }

  }

  /**
   * Method to check if user already has a friend
   * 
   * @param {string} friendId 
   * @returns {boolean} 
   * 
   * @memberOf SearchUserPage
   */
  public checkIfExists(friendId: string): boolean {
    let check: boolean = false;

    this.friendsList.subscribe(data => {
      data.forEach(friend => {
        console.log("comparing " + friend.friendId + " and " + friendId);
        if (friend.friendId == friendId) {
          check = true;
        }
      });
    });
    return check;
  }
}
