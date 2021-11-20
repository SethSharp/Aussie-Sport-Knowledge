import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss'],
})
export class QuizSelectionComponent implements OnInit {

  // Takes in a function to close unhide the menu content
  @Input()
  closeQuiz: () => void;

  hq = false

  constructor(private router: Router) {}

  ngOnInit() {}

  hide() {
    this.closeQuiz()
    // Hides the component content on and unhide the menu content with closeQuiz()
    this.hq = true
  }

  // Navs to the quiz page, passing in details about the quizb
  navToQuiz(info) {
    this.router.navigateByUrl('/quiz-page/' + info);
  }
}
