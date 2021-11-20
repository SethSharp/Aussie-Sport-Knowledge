import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from './../questionFolder/question.service';
import { Question } from '../questionFolder/question';
import { ModalController, AlertController } from '@ionic/angular';
import { QuestionSummaryPage } from './../question-summary/question-summary.page';

@Component({
  selector: 'app-multiplayer-quiz',
  templateUrl: './multiplayer-quiz.page.html',
  styleUrls: ['./multiplayer-quiz.page.scss'],
})
export class MultiplayerQuizPage implements OnInit {
  questions: Question[] = [];
  questionPosition = 0;
  tempScores = [];
  leftOverUsers = [];
  guesses = [];
  curAns;
  totalUsersLeft = 0;
  q = 'multi';

  players = [];
  questionsAnswered = [];

  constructor(
    private questionService: QuestionService,
    private modalController: ModalController,
    private alertController: AlertController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.getQuestions();
    this.initGameStart();
  }
  ngOnDestroy() {}

  ionViewDidEnter() {
    this.getUser();
  }

  // Sets some initial values for playing
  initGameStart() {
    for (let i = 0; i < this.players.length; i++) {
      this.tempScores.push(0);
      this.guesses.push(0);
    }
    this.questionPosition = 0;
    // Sets the current answer, used later
    this.curAns = this.questions[this.questionPosition].answer;
  }

  // After each time users enter in all questions and the question summary is up
  // This will reset some values to use for next round
  newRound() {
    this.questionPosition += 1;
    this.leftOverUsers = [];
    this.totalUsersLeft = 0;
    for (let i = 0; i < this.players.length; i++) {
      this.leftOverUsers.push(this.players[i]);
      this.guesses[i] = -1;
    }
    this.curAns = this.questions[this.questionPosition].answer;
  }

  // Tests whether the quiz has ended if the current question position is one less then question length
  quizEnd() {
    return this.questionPosition == this.questions.length - 1;
  }

  // Returns the response, used to display the answer
  response() {
    let pos = this.questions[this.questionPosition].answer;
    let ans = this.questions[this.questionPosition];
    switch (pos) {
      case 1:
        return ans.response_1;
      case 2:
        return ans.response_2;
      case 3:
        return ans.response_3;
      case 4:
        return ans.response_4;
    }
  }

  // When all users have submitted an answer
  async submitQuestion() {
    // Ensures all users have submitted
    if (this.totalUsersLeft != this.leftOverUsers.length) {
      this.displayAlert("All users need to enter an answer")
      return
    }
    const modal = await this.modalController.create({
      component: QuestionSummaryPage,
      componentProps: {
        users: this.players,
        scores: this.tempScores,
        end: this.quizEnd(),
        answer: this.response(),
        pos: this.curAns,
        guesses: this.guesses,
        category: this.questions[this.questionPosition].category,
      },
    });
    modal.onDidDismiss().then((retval) => {
      if (!this.quizEnd()) this.newRound();
    });
    return await modal.present();
  }

  // Displays custom alert
  async displayAlert(title) {
    const alert = await this.alertController.create({
      header: title,
    });
    await alert.present();
  }

  // Presents a alert to select each of the users questions
  presentAlertRadio = (ans, e = undefined): void => {
    this.test(ans);
  };

  async test(ans) {
    const alert = await this.alertController.create({
      cssClass: 'user-selection',
      header: 'Select users answers',
      inputs: this.createInputs(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Submit final guesses',
          handler: (data: String) => {
            // Data returns the users (indexs in leftover array) that selected the checkbox => ans
            if (data == undefined) return;
            for (let i = 0; i < data.length; i++) {
              // pos reps the actual indexes, i isn't eg; i = 0,1,2 users: 1,2,3
              let pos: number = +data[i];
              this.leftOverUsers[pos] = '';
              this.guesses[pos] = ans;
              // Increasing users left, to be used at line 91
              this.totalUsersLeft++;
              if (ans == this.curAns) this.tempScores[pos] += 10;
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Creating an input for the alert so only the users who havent guessed are
  // to be selected when the user selects an answer
  createInputs() {
    let theNewInputs = [];
    for (let i = 0; i < this.leftOverUsers.length; i++) {
      if (this.leftOverUsers[i] == '') {
        continue;
      }
      theNewInputs.push({
        type: 'checkbox',
        label: this.leftOverUsers[i].name,
        value: i,
        handler: () => {},
        checked: false,
      });
    }
    return theNewInputs;
  }

  // Gets quesiton with service, previously entered
  getQuestions(): void {
    this.questionService
      .getQuestions()
      .subscribe((questions) => (this.questions = questions)); //Returns an array of questions
  }

  async getUser() {
    this.players = await this.storage.get('selectedPlayers');
    await this.players.forEach((player) => {
      this.leftOverUsers.push(player);
    });
    this.initGameStart();
  }
}
