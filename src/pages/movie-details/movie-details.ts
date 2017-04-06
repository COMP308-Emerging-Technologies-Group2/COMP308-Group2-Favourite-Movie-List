import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// import angularfire
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html'
})
export class MovieDetailsPage {
  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';
  public media;
  public favorites: FirebaseListObservable<any>;
  public userId: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public af: AngularFire,
    public alertCtrl: AlertController) {

    this.af.auth.subscribe(auth => this.userId = auth.uid);
    this.favorites = af.database.list('/users-favorites/' + this.userId);

    this.media = {};

    let id: string = this.navParams.get('id');

    //console.log(id);
    this.http.get(this.imdbApiUrl + '/id/' + id).map(res => res.json()).subscribe(
      data => {
        //console.log(data);
        this.media = data;
        if (data['_episodes']) {
          console.log('there are _episodes');
        }
      }
    );
  }

  public AddToFavorites(): void {
    console.log("STARTING ADDTOFAVORITES");

    let check = this.checkIfExists();

    if (check == false) {
      console.log("ADDED!");
      this.favorites.push({
        imdbID: this.media.imdbid,
        public: true
      }).then(()=> {console.log("Successfully Added")}).catch(err => console.log(err))
    }
  }

  public checkIfExists(): any {

    let check: boolean = false;
    this.favorites.subscribe(data => {
      data.forEach(element => {
        console.log("Inside the loop" + element.imdbID);
        if (element.imdbID == this.media.imdbid) {
          check = true;
        }
      });
    }).unsubscribe();
    return check;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetailsPage');
  }

}
