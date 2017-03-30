import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class AuthData {
  constructor(public http: Http) {
    console.log('Hello AuthData Provider');
  }
}
