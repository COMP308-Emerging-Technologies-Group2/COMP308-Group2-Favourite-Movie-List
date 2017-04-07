import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {SearchPage} from '../pages/search/search';
import {SearchUserPage} from '../pages/search-user/search-user';
import {AngularFire} from 'angularfire2';
import {LoginPage} from '../pages/login/login';
import {FavoritesPage} from '../pages/favorites/favorites';
import {FriendsListPage} from '../pages/friends-list/friends-list';
import {UserDetailsPage} from '../pages/user-details/user-details';
import {AuthData} from '../providers/auth-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public af: AngularFire,
              public authData: AuthData) {
    this.initializeApp();

    this.pages = [

      { title: 'Home', component: HomePage },
      { title: 'Favorites', component : FavoritesPage},
      {title: 'Friends', component: FriendsListPage},
      {title: 'Search', component: SearchPage},
      {title: 'Search Users', component: SearchUserPage},
      {title: 'My Profile', component: UserDetailsPage},
      {title: 'Logout', component: LoginPage}

    ];

    const authObserver = af.auth.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title === 'Logout') {
      this.af.auth.logout();
    }

    if (page.title === 'My Profile') {
      this.nav.setRoot(page.component, {userId: this.authData.authState.uid});
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
