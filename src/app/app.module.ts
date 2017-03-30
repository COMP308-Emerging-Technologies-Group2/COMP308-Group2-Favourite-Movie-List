import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {Page1} from "../pages/page1/page1";
import {Page2} from "../pages/page2/page2";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {AuthData} from "../providers/auth-data";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";

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
    Page1,
    Page2,
    LoginPage,
    RegisterPage,
    ResetPasswordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    RegisterPage,
    ResetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData
  ]
})
export class AppModule {
}
