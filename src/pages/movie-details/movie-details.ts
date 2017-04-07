import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

// import angularfire
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html'
})

export class MovieDetailsPage {
  public rootPage: any = HomePage;
  private imdbApiUrl: string = 'https://imdb-api-wrapper.herokuapp.com';
  public media;
  public favorites: FirebaseListObservable<any>;
  public userId: string;
  public check: boolean;
  public posterAvailable: boolean = true;

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
        // Checks if the movie already exists
        this.check = this.checkIfExists();
        if (data['_episodes']) {
          console.log('there are _episodes');
        }
        if (data['poster'] === 'N/A') {
          this.posterAvailable = false;
        }
        console.log('poster:' + this.posterAvailable);
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
      }).then(() => { console.log("Successfully Added") }).catch(err => console.log(err))
    }
    // Add a Go To Home Section
    this.navCtrl.setRoot(HomePage);
  }

  public RemoveFromFavorites(): void {
    let key: string = "";
    //console.log(this.media.imdbid);
    this.af.database.list('/users-favorites/' + this.userId + '/').subscribe(data => {
      data.forEach(element => {
        if (element.imdbID == this.media.imdbid) {
          key = element.$key;
          this.af.database.list('/users-favorites/' + this.userId + '/').remove(key).then(() => { console.log("Sucessfully Removed") }, err => { console.log(err) });
        }
      })
    }).unsubscribe();
    this.navCtrl.setRoot(HomePage);

  }

  public checkIfExists(): boolean {
    let check: boolean = false;
    this.favorites.subscribe(data => {
      data.forEach(element => {
        console.log(element.imdbID);
        console.log(this.media.imdbid);
        if (element.imdbID == this.media.imdbid) {
          check = true;
        }
      });
    });
    return check;
  }

  ionViewDidLoad() {
    console.log("From ionViewDidLoad")
  }
}
