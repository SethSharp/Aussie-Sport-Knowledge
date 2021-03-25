import { QuestionService } from './../questionFolder/question.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../questionFolder/question';

//Importing questions to pass as paramter
import { QUESTIONS } from '../questionFolder/mock-questions';
import { NRL } from '../questionFolder/NRL/NRL';
import { CRICKET } from '../questionFolder/CRICKET/CRICKET';
import { AFL } from '../questionFolder/AFL/AFL';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.page.html',
  styleUrls: ['./quiz-page.page.scss'],
})
export class QuizPagePage implements OnInit {
  questions: Question[] = [];
  questionPosition = 0;
  quizInfo = '';

  questionsAnswered = [];
  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {
    this.questionPosition = 0;
  }
  ngOnInit() {
    //Need to assign question to question vlaue
    this.quizInfo = 'NRL';
    this.getQuestions();
    this.questionPosition = 0;
  }


  checkAnswer(correct: Boolean) {
    console.log(this.questionPosition, this.questions.length);
    if (this.questionPosition == this.questions.length - 1) {
      this.router.navigateByUrl('/home');
    }
    if (correct) {
      this.questionPosition++;
    } else {
      console.log('Inorrect answer');
    }
  }

  getQuiz() {
    switch (this.quizInfo) {
      case 'NRL':
        {
          return NRL;
        }
        break;
      case 'AFL':
        {
          return AFL;
        }
        break;
      case 'CRICKET':
        {
          return CRICKET;
        }
        break;
      default: {
        return QUESTIONS;
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
      .subscribe((questions) => (this.questions = questions)); //Returns an array of heroes
  }
}
