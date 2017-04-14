/**
 * File Name:     providers/search-user.ts
 * Description:   A provider service that contains user-related information and data
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// import angularfire 
import { AngularFire, FirebaseListObservable } from 'angularfire2';


/**
 * Contains user-related information and data
 * 
 * @export
 * @class SearchUserProvider
 */
@Injectable()
export class SearchUserProvider {

  /**
   * Creates an instance of SearchUserProvider.
   * @param {AngularFire} af 
   * 
   * @memberOf SearchUserProvider
   */
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
