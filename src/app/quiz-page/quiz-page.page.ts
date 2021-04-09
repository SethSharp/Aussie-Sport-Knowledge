import { QuestionService } from './../questionFolder/question.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../questionFolder/question';

//Importing questions to pass as paramter
import { NRL } from '../questionFolder/NRL/NRL';
import { CRICKET } from '../questionFolder/CRICKET/CRICKET';
import { AFL } from '../questionFolder/AFL/AFL';

// Importing the user to adjust the score
import { User } from './../userInfo';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.page.html',
  styleUrls: ['./quiz-page.page.scss'],
})
export class QuizPagePage implements OnInit {
  questions: Question[] = [];
  questionPosition = 0;
  quizParam = '';
  title = ""
  mode = ""
  score = 0

  questionsAnswered = [];
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.score = 0;
  }
  ionViewDidEnter() {
    this.questionPosition = 0
  }
  ngOnInit() {
    //Need to assign question to question vlaue
    this.quizParam = this.route.snapshot.paramMap.get('information');
    this.title = this.quizParam.substring(0,3)
    this.mode = this.quizParam.substring(3,8)
    this.getQuestions();
  }
  checkAnswer(ansPos: number) {
    let curSpot = this.questions[this.questionPosition].answer;
    if (curSpot == ansPos) {
      this.questionPosition++;
    } else {
      console.log('Inorrect answer')
    }
    if (this.questionPosition == this.questions.length) {
      this.router.navigateByUrl('/home/test');
    }
  }

  getQuiz() {
    switch (this.title) {
      case 'NRL':
        {
          if (this.mode == "EASY") {
            // Return NRLEASY questions etc, for all
          }
          return NRL;
        }
        break;
      case 'AFL':
        {
          return AFL;
        }
        break;
      case 'CRIC':
        {
          return CRICKET;
        }
        break;
      default: {
        return AFL;
        break;
      }
    }
  }
  getQuestions(): void {
    //Waits for the Observable to emit the array of heroes- now or 5minutes.
    //The subsrcube() method passes the emitted array to the callback, which sets the components herpes property
    //To get the right questions, change the array

    //When we get to this page, using the route params, will identify the correct set of
    //questions for the service to return

    this.questionService
      .getQuestions(this.getQuiz())
      .subscribe((questions) => (this.questions = questions)); //Returns an array of questions
  }
}
