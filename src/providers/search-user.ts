import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// import angularfire 
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class SearchUserProvider {

  constructor(public af: AngularFire) {
    console.log('Hello Search Provider');
  }


  /**
   * getSearchResults
   */
  public getSearchResults(searchBy: string, query: string): Promise<FirebaseListObservable<any>> {
    return new Promise<FirebaseListObservable<any>>((resolve, reject) => {
      if (typeof query !== 'undefined') {
        resolve(this.af.database.list('/user-settings', {
          query: {
            orderByChild: searchBy,
            equalTo: query 
          }
        }));
      }
      else {
        resolve();
      }
    })
  }
}
