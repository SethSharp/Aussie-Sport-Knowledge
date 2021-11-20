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
  ans: Number;

  category: String;

  editaddbtn = 'Add question';
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ionViewDidEnter() {
    // No need to get all values if this modal isn't being used for editing
    // if it is (Question is not defined), then get all values
    this.qst = this.navParams.get('question');
    if (this.qst != undefined) {
      this.res_1 = this.navParams.get('response_1');
      this.res_2 = this.navParams.get('response_2');
      this.res_3 = this.navParams.get('response_3');
      this.res_4 = this.navParams.get('response_4');
      this.ans = this.navParams.get('answer');
      this.category = this.navParams.get('category');
      this.editaddbtn = 'Edit contact';
    }
  }

  ngOnInit() {}

  isAnswer(i) {
    if (this.ans == undefined) return false
    if (i == this.ans) {
      return true
    }
    return false
  }

  // Currently which ever was the last radio button to be selected is the answer
  onChange(item) {
    this.ans = item;
  }

  exitModal() {
    this.modalController.dismiss()
  }

  // Ensures all information is entered before submitting
  closeModal() {
    if (
      this.qst == undefined ||
      this.res_1 == undefined ||
      this.res_2 == undefined ||
      this.res_3 == undefined ||
      this.res_4 == undefined ||
      this.ans == undefined ||
      this.category == undefined
    ) {
      alert('Enter all information');
    } else {
      this.modalController.dismiss({
          question: this.qst,
          response_1: this.res_1,
          response_2: this.res_2,
          response_3: this.res_3,
          response_4: this.res_4,
          answer: this.ans,
          category: this.category.toString()
      })
    }
  }
}
