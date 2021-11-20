import { AccessStorageService } from './../Services/access-storage.service';
import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-summary',
  templateUrl: './question-summary.page.html',
  styleUrls: ['./question-summary.page.scss'],
})
export class QuestionSummaryPage implements OnInit {
  users = [];
  guesses = [];
  scores = [];
  gameEnded;
  buttonTxt = 'Next question';
  title = '';
  answer = '';
  pos;
  finalUsers;
  cat: string = '';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private storage: Storage,
    private accessStorage: AccessStorageService
  ) {}

  ngOnInit() {
    this.getNavParams();
    if (this.gameEnded) {
      //Game is ending
      this.buttonTxt = 'Finish';
      this.title = 'The game has eneded, congrats to... for winning';
      this.loadUsers();
    }
  }

  getNavParams() {
    this.users = this.navParams.get('users');
    this.scores = this.navParams.get('scores');
    this.gameEnded = this.navParams.get('end');
    this.answer = this.navParams.get('answer');
    this.pos = this.navParams.get('pos');
    this.guesses = this.navParams.get('guesses');
    this.cat = this.navParams.get('category');
    this.sortUserArray()
  }

  sortUserArray() {
    let users = this.users;
    let n = users.length;
    // Selection sort
    for (let startPos = 0; startPos < n; startPos++) {
      let minPos = startPos;
      for (let i = minPos + 1; i < n; i++) {
        if (users[i].score > users[minPos].score) {
          minPos = i;
        }
      }
      let temp = users[startPos];
      users[startPos] = users[minPos];
      users[minPos] = temp;
    }
  }
  ionViewDidEnter() {
    // Assign all updated data, correct/incorrect for each sport and score
    this.userStats();
  }

  // Navigate home if the game has ended, either way need to close modal, otherwise it will overlap the home page
  async closePage() {
    await this.storage.set('selectedPlayers', this.users);
    if (this.gameEnded) {
      // Once the game ends, need to save the users, this function does heavy lifting
      this.accessStorage.updateMultiplayer(this.users);
      this.router.navigateByUrl('/home');
    }
    this.modalController.dismiss();
  }

  // Returns if i is an aswer (i => response index)
  isAnswer(i) {
    if (i == -1) return false
    return this.guesses[i] == this.pos;
  }

  userStats() {
    for (let i = 0; i < this.guesses.length; i++) {
      let x = this.isAnswer(i);
      if (x) {
        this.correct(i, this.cat);
      } else {
        this.incorrect(i, this.cat);
      }
    }
  }

  // Function called when the user at i guesses correctly
  correct(i, c) {
    this.users[i].correct++;
    this.users[i].score += 10;
    this.users[i].answerSteak++;
    // Updates answer streak if required
    if (this.users[i].answerSteak > this.users[i].bestAnswerStreak) {
      this.users[i].bestAnswerStreak = this.users[i].answerSteak;
    }
    if (c == undefined) return;
    // If the question wasn't random (From solo quizzes) and actually original
    // Then the user can be awared
    this.users[i].sports[c][0]++;
  }

  // Function for when user is incorrect
  incorrect(i, c) {
    this.users[i].incorrect++;
    this.users[i].answerSteak = 0;
    if (c == undefined) return;
    this.users[i].sports[c][1]++;
  }

  // Colour of the icon based on the response index, to show which players got it right
  // Only used to show if an answer is correct
  colour(i) {
    if (this.isAnswer(i)) {
      return 'success';
    }
    return 'danger';
  }

  //When assigning the score, need to get the stored users from storage
  // Then based on the positions passed from prev page, assign final score
  // Currently, oly way to get score is to finish the game
  async loadUsers() {
    this.finalUsers = await this.storage.get('players');
  }
}
