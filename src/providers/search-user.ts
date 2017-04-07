import { Injectable } from '@angular/core';
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
   * @param searchProperty: string - which attribute of the document to search
   * @param query: string - the search key
   */
  public getSearchResults(searchProperty: string, query: string): Promise<FirebaseListObservable<any>> {
    return new Promise<FirebaseListObservable<any>>((resolve, reject) => {
      if (typeof query !== 'undefined') {
        resolve(this.af.database.list('/user-settings', {
          query: {
            orderByChild: searchProperty,
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
