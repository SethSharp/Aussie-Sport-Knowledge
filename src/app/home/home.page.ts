import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menuHidden = false;
  playHidden = true;
  profileHidden = true;
  multiHidden = true;
  title = 'Aussie Sport Knowledge';
  username = ""
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  navToQuiz(info) {
    // Need to pass through information about uestions
    // POssible change array of questions through service
    //pass through dynammic string to identify the information
    // sport-difficulty
    // NRL-Easy
    this.menuHidden = false
    this.playHidden = true
    this.router.navigateByUrl('/quiz-page/' + info);
  }
  hideProfile() {
    this.title = 'Aussie Sport Knowledge';
    this.menuHidden = false;
    this.profileHidden = true;
  }
  playMenu() {
    this.router.navigateByUrl("/mode-selection")
  }
  playMulti() {
    this.router.navigateByUrl('/multiplayer');
  }
  navToProf() {
    // Navigate to a profile page
    this.router.navigateByUrl('/profile-page/' + this.username);
  }
  navToLeader() {
    this.router.navigateByUrl('/leaderboard')
  }
}
