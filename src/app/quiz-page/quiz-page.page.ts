import { Storage } from '@ionic/storage-angular';
import { UserTemplate } from './../User/userTemplate';
import { AlertController } from '@ionic/angular';
import { QuestionService } from './../questionFolder/question.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../questionFolder/question';
import { AccessStorageService } from './../Services/access-storage.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.page.html',
  styleUrls: ['./quiz-page.page.scss'],
})

export class QuizPagePage implements OnInit {
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private accessStorage: AccessStorageService,
    private storage: Storage
  ) {}

  questions: Question[] = [];
  questionsAnswered = [];
  questionPosition = 0;
  quizParam = "";
  title = "";
  score = 0;
  amount = 10; // Score per correct answer
  counter = 30; // Total time
  totalCorrect = 0;

  quizEnded = false;
  user = UserTemplate;

  ionViewDidEnter() {
    this.questionPosition = 0;
    this.score = 0;
    this.totalCorrect = 0;
    // Initialise a timer
    let intervalId = setInterval(() => {
      this.counter -= 1;
      // When the timer has reached 0 or less, then the user failed to complete the quiz
      if (this.counter <= 0 || this.quizEnded) {
        clearInterval(intervalId);
        // Displays quiz summary and routes back home
        let reason = 'Quiz completed'
        if (this.counter <= 0) reason = 'You can out of time';
        this.quizSum(reason);
        this.router.navigateByUrl('/home');
      }
    }, 1000);
  }

  ngOnInit() {
    // String passed through route will always be of these sizes
    // NRLMEDI => title = NRL, mode = MEDI (medium)
    // Different difficulties will be implemented later
    this.quizParam = this.route.snapshot.paramMap.get('information');
    this.title = this.quizParam.substring(0, 3);
    this.getQuestions();
    this.getUser();
  }

  checkAnswer = (ansPos: number, event = undefined): void => {
    this.check(ansPos, event);
  };

  // Checks the users answer and applies the corresponding function
  check(ansPos, event) {
    if (this.counter <= 0) return; // Makes sure the user cannot guess any more and get points if time is up
    let curSpot = this.questions[this.questionPosition].answer;
    if (curSpot == ansPos) {
      this.userCorrect();
      this.displayInfo(event, 'CORRECT', '#05f215');
    } else {
      this.userIncorrect();
      this.displayInfo(event, 'INCORRECT', 'red');
    }
    this.questionPosition++;
    // Determines if the quiz is completed
    if (this.questionPosition == this.questions.length) {
      this.questionPosition--; // Decrement to avoid the html displaying a undefined quesiotn (ERROR)
      this.quizEnded = true;
    }
  }

  // Displays ans on the screen at click location
  displayInfo(event, ans, c) {
    let x = event.clientX;
    let y = event.clientY;

    let text = document.getElementById('text');
    text.style.color = c;
    text.textContent = ans;
    text.style.left = x + 'px';
    text.style.top = y - 50 + 'px'; // Position adjusted to account for the label size
    // This shows the text for only a split second so it isn't hogging the screen, but the
    // user will also know that it is correct/incorrect
    setTimeout(() => {
      text.textContent = '';
    }, 750);
  }

  // Function when the user is correct
  userCorrect() {
    // Updating certain values
    this.score += this.amount;
    this.totalCorrect++;
    this.user.sports[this.title][0]++;
    this.user.correct++;
    this.user.answerSteak++;
    // Checking if answer streak has been brokem
    if (this.user.answerSteak > this.user.bestAnswerStreak) {
      this.score++
      this.user.bestAnswerStreak = this.user.answerSteak;
    }
  }

  // Funciton when the user is incorrect
  userIncorrect() {
    this.user.sports[this.title][1]++;
    this.user.incorrect++;
    this.user.answerSteak = 0;
    this.counter-=5
  }

  // Once the quiz ends, a simple alert is displayed to show some information about the quiz
  async quizSum(r) {
    this.user.score += this.score;
    this.user.totalGames++;
    this.accessStorage.setData("mainuser", this.user)
    const alert = await this.alertController.create({
      header: r,
      message: `You got ${this.totalCorrect} questions right out of ${this.questions.length} and\nearned ${this.score} points`,
      buttons: [
        {
          text: 'Dimiss',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  async getUser() {
    this.user = await this.storage.get("mainuser")
  }

  // Gets the questions based on the route (Process in the question service)
  getQuestions(): void {
    let m = this.quizParam.substring(3, 8);
    // Each difficulty will both be rewarding but more challenging
    if (m == "MEDI") {
      this.counter = 40
      this.amount = 12
    } else if (m == "HARD") {
      this.counter = 50
      this.amount = 15
    }
    // Get the question observable based on what the route is
    this.questionService
      .getQuestions(this.title, m)
      .subscribe((questions) => (this.questions = questions)); //Returns an array of questions
  }
}
