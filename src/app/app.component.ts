/**
 * File Name:     app/component.ts
 * Description:   Entry point of the program
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { AngularFire } from 'angularfire2';
import { LoginPage } from '../pages/login/login';
import { FavoritesPage } from '../pages/favorites/favorites';
import { FriendsListPage } from '../pages/friends-list/friends-list';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { SearchUserPage } from "../pages/search-user/search-user";
import { AuthData } from '../providers/auth-data';

/**
 * Entry point of the program.
 *
 * @export
 * @class MyApp
 */
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  isLoggedIn: boolean;

  pages: Array<{ title: string, icon: string, component: any }>;

/**
 * Creates an instance of MyApp.
 * @param {Platform} platform
 * @param {StatusBar} statusBar
 * @param {SplashScreen} splashScreen
 * @param {AngularFire} af
 * @param {AuthData} authData
 *
 * @memberOf MyApp
 */
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public af: AngularFire,
    public authData: AuthData
  ) {
    this.initializeApp();

    this.isLoggedIn = false;
    this.rootPage = HomePage;

    this.pages = [

      { title: 'Home', icon: 'browsers', component: HomePage },
      { title: 'Favorites', icon: 'star', component: FavoritesPage },
      { title: 'Search', icon: 'videocam', component: SearchPage },
      { title: 'Friends', icon: 'people', component: FriendsListPage },
      { title: 'Add Friends', icon: 'person-add', component: SearchUserPage },
      { title: 'Profile', icon: 'person', component: UserDetailsPage },
      { title: 'Logout', icon: 'exit', component: LoginPage },
      { title: 'Login', icon: 'exit', component: LoginPage }

    ];

    const authObserver = af.auth.subscribe(user => {
      authObserver.unsubscribe();
    });

    af.auth.subscribe(user => {
      this.isLoggedIn = !!user;
    })
  }

  /**
   * Method to initialize the environment
   *
   *
   * @memberOf MyApp
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


    });
  }

  /**
   * Method to display a speficied page
   *
   * @param {any} page
   *
   * @memberOf MyApp
   */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title === 'Logout') {
      this.af.auth.logout();
    }

    if (page.title === 'Favorites') {
      this.nav.setRoot(page.component, { userId: this.authData.authState.uid });
    }
    else if (page.title === 'Profile') {
      this.nav.setRoot(page.component, { userId: this.authData.authState.uid });
    }
    else {
      this.nav.setRoot(page.component);
    }
  }
}
