import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Injectable} from "@angular/core";


// import angularfire 
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()

export class AddMovies {
  public favoritesList: FirebaseListObservable<any>;
  public userId: string;
  public favorites: Array<any>;

  constructor(public af: AngularFire) {
  }

  public GetMovies(){

  }

}