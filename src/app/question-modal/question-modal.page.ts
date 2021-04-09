import { Question } from './../questionFolder/question';
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.page.html',
  styleUrls: ['./question-modal.page.scss'],
})
export class QuestionModalPage implements OnInit {
  qst: String;
  res_1: String;
  res_2: String;
  res_3: String;
  res_4: String;
  category: String;
  //ans = [];
  ans: Number;

  checkBoxPos: Number;
  editaddbtn = 'Add Contact';
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ionViewDidEnter() {
    this.qst = this.navParams.get('question');
    this.res_1 = this.navParams.get('response_1');
    this.res_2 = this.navParams.get('response_2');
    this.res_3 = this.navParams.get('response_3');
    this.res_4 = this.navParams.get('response_4');
    this.ans = this.navParams.get('answer');
    if (this.qst != undefined) {
      this.editaddbtn = 'Edit contact';
    }
  }

  ngOnInit() {}

  onChange(item) {
    // if (this.ans.includes(item)) {
    //   this.ans = this.ans.filter((value) => value != item);
    // } else {
    //   this.ans.push(item);
    // }
    this.ans = item;
  }

  closeModal() {
    this.modalController.dismiss({
      question: this.qst,
      response_1: this.res_1,
      response_2: this.res_2,
      response_3: this.res_3,
      response_4: this.res_4,
      answer: this.ans,
    });
  }
}
