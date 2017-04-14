/**
 * File Name:     providers/search.ts
 * Description:   A provider service that contains movie-related information and data
 * Authors:       Tony Bogun, Liavontsi Brechka, Aaron Fernandes, Omid Khataee, Edward Song
 * GitHub:        https://github.com/COMP308-Emerging-Technologies-Group2/COMP308-Group2-Favourite-Movie-List
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Contains movie-related information and data
 * 
 * @export
 * @class SearchProvider
 */
@Injectable()
export class SearchProvider {

  /**
   * Creates an instance of SearchProvider.
   * @param {Http} http 
   * 
   * @memberOf SearchProvider
   */
  constructor(public http: Http) {
    console.log('Hello Search Provider');
  }



  /**
   * Gets search result from imdb
   * 
   * @param {string} query 
   * @returns {Promise<Array<Object>>} 
   * 
   * @memberOf SearchProvider
   */
  public getSearchResults(query: string): Promise<Array<Object>> {
    return new Promise<Array<Object>>((resolve, reject) => {
      if (typeof query !== 'undefined' && typeof query[0] !== 'undefined') {

        this.http.get(`https://cors-anywhere.herokuapp.com/v2.sg.media-imdb.com/suggests/${query[0].toLowerCase()}/${query}.json`)
          .subscribe(data => resolve(this._parseResponse(data['_body'], query)));
      }
      else {
        resolve([]);
      }
    })
  }

  /**
   * parses json response from imdb
   * 
   * @param imdbResponse 
   * @param query 
   */
  private _parseResponse(imdbResponse: string, query: string): Array<Object> {
    let results = Array<Object>();
    // replace spaces the query string with _
    query = (query).split(' ').join('_');
    // remove the imdb part from the start of the response
    let jsonResponse = imdbResponse.replace(`imdb$${query}(`, '');
    jsonResponse = jsonResponse.substring(0, jsonResponse.length - 1);
    jsonResponse = JSON.parse(jsonResponse);
    // if there is a response then create an array
    if (typeof jsonResponse['d'] !== 'undefined') {
      let j: Array<Object> = jsonResponse['d'];
      j.forEach(value => {
        if (typeof value['q'] !== 'undefined') {
          results.push(value);
        }
      })

      return results;
    }

  }

}
