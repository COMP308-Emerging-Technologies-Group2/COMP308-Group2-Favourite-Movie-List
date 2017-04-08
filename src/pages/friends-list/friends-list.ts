import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FavoritesPage } from '../favorites/favorites';
// import angularfire 
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-friends-list',
  templateUrl: 'friends-list.html'
})
export class FriendsListPage {
  public friendsList: FirebaseListObservable<any>;
  public friends: Array<any>;
  public userId: string;

  // private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';


  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

    // authenication
    this.af.auth.subscribe(auth => this.userId = auth.uid).unsubscribe();

    // Getting the value from the database
    this.friendsList = this.af.database.list('/users-friends/' + this.userId);

    // initialize friends
    this.friends = new Array<any>();

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

  // Note: AddFriend takes an email address.
  public AddFriend(email: string) {
    console.log("add friend method called");

    let check = this.CheckIfExists(email);

    if (check == false) {
      this.friendsList.push({
        _email: email,
      }).then(() => { console.log("Successfully Added") }).catch(err => console.log(err))
    }
  }

  // Note: RemoveFriend takes an email address.
  public RemoveFriend(email: string) {
    console.log("delete friend method called");

    let key: string = "";
    this.friendsList.subscribe(data => {
      data.forEach(friend => {
        if (friend._email == email) {
          key = friend.$key;
        }
      })
    }).unsubscribe();

    this.friendsList.remove(key).then(() => { console.log("Sucessfully Removed") }, err => { console.log(err) });
  }

  // method to check if a user already has a friend
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

  viewDetails(friendInfo: any) {
    console.log("User Id: " + friendInfo.$key);
    this.navCtrl.push(FavoritesPage, { userId: friendInfo.$key });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsListPage');
  }
}
