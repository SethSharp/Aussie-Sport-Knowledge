import { HttpClient } from '@angular/common/http';
import { UserTemplate } from './../User/userTemplate';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  uri = 'http://localhost:4000';


  user = UserTemplate
  routeParamsSubscription;
  pos;
  quizHidden = true;
  menuHidden = false;

  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient
  ) { }

  ngOnInit() {

  }

  async getUser() {
    this.user = await this.storage.get('mainuser');
  }

  ionViewDidEnter() {
    this.getUser()
  }

  // Hides the menu and shows the quiz selection component
  showOpts() {
    this.quizHidden = false
    this.menuHidden = true
  }

  // Navigates to the quiz page where you can select different quizzes
  hideQuiz = (): void => {
    this.menuHidden = false
    this.quizHidden = true
  }

  //Navigates to multiplayer page, where the custom questions are
  navToMulti() {
    this.router.navigateByUrl('/multiplayer');
  }

  getSomeURI() {
    return this.http.get(`${this.uri}/hellothere`);
  }

  // Navigates to the main users profile
  navToProf() {
    this.getSomeURI().subscribe((d) => {
      console.log(d);
    })
    // this.router.navigateByUrl('/profile');
  }

  // Navigates to the leaderboard page
  navToLeader() {
    this.router.navigateByUrl('/leaderboard');
  }
}
