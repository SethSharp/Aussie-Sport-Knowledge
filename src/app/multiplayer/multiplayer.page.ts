
import { UserTemplate } from './../User/userTemplate';
import { CUSTOM } from './../questionFolder/TEMP';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { QuestionModalPage } from './../question-modal/question-modal.page';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from './../questionFolder/question.service';
import { Question } from '../questionFolder/question';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.page.html',
  styleUrls: ['./multiplayer.page.scss'],
})
export class MultiplayerPage implements OnInit {

  category = '';
  name = '';
  txt = '';
  btnIcon = 'arrow-back-outline';

  qst: String;
  res_1: String;
  res_2: String;
  res_3: String;
  res_4: String;
  ans: Number;

  questions: Question[] = [];
  randomQPos = [];
  randomQ = [];
  host;

  // Displays all available users
  players = [];
  // Holds all users, to evntually update the storage with each newely added user
  storedUsers = [];
  // Holds a spot in storage for the users that are playing the quiz, does get removed after quiz has ended
  selectedPlayers = [];

  constructor(
    public alertController: AlertController,
    private modalController: ModalController,
    private router: Router,
    private questionService: QuestionService,
    private storage: Storage,
  ) {}

  ionViewDidEnter() {
    this.getUsers();
  }

  ngOnInit() {
    this.getQuestions();
  }

  ngOnDestroy() {
    this.storage.set('selectedPlayers', []);
  }

  // Modal to add a question
  async addQModal() {
    const modal = await this.modalController.create({
      component: QuestionModalPage,
      componentProps: {},
    });
    modal.onDidDismiss().then((retval) => {
      if (retval.data == undefined) return;
      // Questions for display and CUSTOM to fetch on next page
      this.questions.push(retval.data);
      CUSTOM.push(retval.data);
    });
    return await modal.present();
  }

  // Edit question modal
  async editQModal(pos) {
    if (this.questions[pos].category.length == 0) return;
    const modal = await this.modalController.create({
      component: QuestionModalPage,
      componentProps: {
        // Pass through old data
        question: this.questions[pos].question,
        response_1: this.questions[pos].response_1,
        response_2: this.questions[pos].response_2,
        response_3: this.questions[pos].response_3,
        response_4: this.questions[pos].response_4,
        answer: this.questions[pos].answer,
        category: this.questions[pos].category,
      },
    });
    modal.onDidDismiss().then((retval) => {
      // Updates question, modal returns an object
      this.questions[pos] = retval.data;
      CUSTOM[pos] = retval.data;
    });
    return await modal.present();
  }

  // Selects a question from NRL, soon to be more sports and acutally random
  addRandQ() {
    let pos = Math.round(Math.random() * this.randomQ.length);
    let q = this.randomQ[pos];
    this.questions.push(q);
    CUSTOM.push(q);
    this.randomQ.splice(pos, 1);
  }

  // Splices the array to remove the question
  deleteItem(position) {
    this.questions.splice(position, 1);
    CUSTOM.splice(position, 1);
  }

  // Creates inputs for selectable players, players to be entered into the quiz
  createInputs() {
    let theNewInputs = [];
    for (let i = 0; i < this.players.length; i++) {
      let p = this.players[i];
      if (p == '') continue;
      theNewInputs.push({
        type: 'checkbox',
        cssClass: 'checkbox-test',
        label: p.name,
        value: i,
        handler: () => {},
        checked: false,
      });
    }
    return theNewInputs;
  }

  // Main alert controller to add users
  async addPlayer() {
    const alert = await this.alertController.create({
      cssClass: 'user-selection',
      header: 'Select users for quiz',
      inputs: this.createInputs(),
      buttons: [
        {
          text: 'Submit users to be added',
          handler: (data: String) => {
            // Data returns the users (indexs in leftover array) that selected the checkbox => ans
            if (data == undefined) return;
            for (let i = 0; i < data.length; i++) {
              // pos reps the actual indexes, i isn't eg; i = 0,1,2 users: 1,2,3
              let pos: number = +data[i];
              this.selectedPlayers.push(this.players[pos]);
              this.players[pos] = '';
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Creates a new player based on the name entered in the html input
  async createNewPlayer() {
    if (this.name == "") {
      this.displayAlert('You need to enter name for this user');
      return;
    }

    // This checks the current users and host and makes sure that the name is unique
    let u = this.userExists(this.name)
    let m = this.host.name == this.name
    if (u || m) {
      this.displayAlert(this.name + " already exists");
      return;
    }

    // Creating the new user templating and updating id and name
    let t = UserTemplate;
    t.id = this.storedUsers.length;
    t.name = this.name;

    // Re-assigning object as with the objects it is pass by reference
    // Had a problem when new players being added all equalled the preivously
    // entered user
    let tempUser = {};
    for (let key in t) tempUser[key] = t[key];

    this.storedUsers.push(tempUser);
    this.players.push(tempUser);
    await this.storage.set('players', this.storedUsers);
    this.name = '';
  }

  // Quick function to check if name is in the current player array
  userExists(name) {
    for (let i = 0; i < this.players.length; i++) {
      if (name == this.players[i].name) {
        return true
      }
    }
    return false
  }

  // Displays a dynamic alert based on the title, enter a unique username or enter something into the text box
  async displayAlert(title) {
    const alert = await this.alertController.create({
      header: title,
    });
    await alert.present();
  }

  // Removes player from the current selected players (Selected for quiz)
  // Re-adds them to the players incase the user wants to put them back in
  removePlayer(i) {
    let u = this.selectedPlayers[i];
    if (u.id == -1) return;
    this.players.push(u);
    this.selectedPlayers.splice(i, 1);
  }

  // Ensures that the number of questions is more then 3 and only saves the users when
  // the user can go to next stage
  async playQuiz() {
    if (this.questions.length < 3) {
      this.displayAlert('Please enter in at atleast 3 questions');
      return
    } else if (this.selectedPlayers.length < 2) {
      this.displayAlert('Please enter in some users to play');
      return
    }
    await this.storage.set('selectedPlayers', this.selectedPlayers);
    this.router.navigateByUrl('/multiplayer-quiz');
  }

  // Waits for the Observable to emit the array of questions - now or 5 minutes.
  // The subsrcube() method passes the emitted array to the callback, which sets the randomQ array to NRL questions
  getQuestions(): void {
    this.getQuiz("NRL", "EASY");
    this.getQuiz("AFL", "HARD");
    this.getQuiz("CRI", "EASY");
  }

  // Uses question service to retrieve an array of objects containing questions
  getQuiz(n, t) {
    this.questionService.getQuestions(n, t).subscribe(q => {
      q.forEach(e => {
        this.randomQ.push(e)
      });
    })
  }

  // Gets the main user, stored users and adds the stored users to an array
  async getUsers() {
    this.host = await this.storage.get('mainuser');
    this.storedUsers = await this.storage.get('players');
    // Selected is all temporary, then used to add scores in players (storedUsers)
    this.selectedPlayers = [];
    for (let i = 0; i < this.storedUsers.length; i++) {
      this.players.push(this.storedUsers[i]);
    }
  }
}
