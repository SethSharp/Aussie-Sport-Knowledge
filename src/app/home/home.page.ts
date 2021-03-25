import { Router } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  ngOnInit() {}

  playQuiz() {
    // Need to pass through information about uestions
    // POssible change array of questions through service
    //pass through dynammic string to identify the information
    // sport-difficulty
    // NRL-Easy
    this.router.navigateByUrl('/quiz-page');
  }


}
