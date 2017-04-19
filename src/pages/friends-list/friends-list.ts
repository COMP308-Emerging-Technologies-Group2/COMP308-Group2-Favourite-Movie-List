/**
 * File Name:     pages/friends-list/friends-list.ts
 * Description:   Logic component of friends list page.
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FavoritesPage } from '../favorites/favorites';
// import angularfire 
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
 * Contains logic for friends list page
 * 
 * @export
 * @class FriendsListPage
 */
@Component({
  selector: 'page-friends-list',
  templateUrl: 'friends-list.html'
})
export class FriendsListPage {
  public friendsList: FirebaseListObservable<any>;
  public friends: Array<any>;
  public userId: string;


  /**
   * Creates an instance of FriendsListPage.
   * @param {NavController} navCtrl 
   * @param {NavParams} navParams 
   * @param {AngularFire} af 
   * 
   * @memberOf FriendsListPage
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

    // authenication
    this.af.auth.subscribe(auth => this.userId = auth.uid).unsubscribe();

    // Getting the value from the database
    this.friendsList = this.af.database.list('/users-friends/' + this.userId);

    // initialize friends
    this.friends = new Array<any>();
    this.friends = [];
    this.friendsList.subscribe(data => {
      data.forEach(friend => {
        console.log("id::: " + friend.friendId);
        let friendData = this.af.database.object('/user-settings/' + friend.friendId);
        friendData.forEach(f => {
          this.friends.push(f);
        });
      });
    });
  }

  /**
   * Method to add a friend by email
   * 
   * @param {string} email 
   * 
   * @memberOf FriendsListPage
   */
  public AddFriend(email: string) {
    console.log("add friend method called");

    let check = this.CheckIfExists(email);

    if (check == false) {
      this.friendsList.push({
        _email: email,
      }).then(() => { console.log("Successfully Added") }).catch(err => console.log(err))
    }
  }

  /**
   * Method to remove a friend by email
   * 
   * @param {*} f 
   * 
   * @memberOf FriendsListPage
   */
  public removeFriend(f: any) {
    this.friends = [];
    console.log("delete friend method called");

    let key: string = "";
    this.friendsList.subscribe(data => {
      data.forEach(friend => {
        if (friend.friendId == f.$key) {
          key = friend.$key;
        }
      })
    }).unsubscribe();

    this.friendsList.remove(key).then(() => { console.log("Sucessfully Removed") }, err => { console.log(err) });
  }
  
  /**
   * Method to check if a user already has a friend
   * 
   * @param {string} email 
   * @returns {boolean} 
   * 
   * @memberOf FriendsListPage
   */
  public CheckIfExists(email: string): boolean {
    let check: boolean = false;
    this.friendsList.subscribe(data => {
      data.forEach(friend => {
        console.log(friend._email);
        if (friend._email == email) {
          check = true;
        }
      });
    });
    return check;
  }


  /**
   * Method to view a friend's details
   * 
   * @param {*} friendInfo 
   * 
   * @memberOf FriendsListPage
   */
  viewDetails(friendInfo: any) {
    console.log("User Id: " + friendInfo.$key);
    this.navCtrl.push(FavoritesPage, { userId: friendInfo.$key, fromFriendList: true });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsListPage');
  }
}
