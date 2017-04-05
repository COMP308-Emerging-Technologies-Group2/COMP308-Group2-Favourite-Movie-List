import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthData } from '../providers/auth-data';
import { MovieDetailsPage } from '../pages/movie-details/movie-details';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyCmsDPLWbEJbwW3vAJ5LRUqCQV-OuYlIU4",
  authDomain: "moviestvlist.firebaseapp.com",
  databaseURL: "https://moviestvlist.firebaseio.com",
  storageBucket: "moviestvlist.appspot.com",
  messagingSenderId: "755631563317"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    SearchPage,
    HomePage,
    MovieDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    SearchPage,
    HomePage,
    MovieDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthData
  ]
})
export class AppModule {
}
