import { ModalController, AlertController } from '@ionic/angular';
import { QuestionModalPage } from './../question-modal/question-modal.page';
import { Question } from './../questionFolder/question';
import { Component, OnInit } from '@angular/core';
import { FnParam } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.page.html',
  styleUrls: ['./multiplayer.page.scss'],
})
export class MultiplayerPage implements OnInit {
  questions = [];

  constructor(
    public alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async addQModal() {
    const modal = await this.modalController.create({
      component: QuestionModalPage,
      componentProps: {},
    });
    modal.onDidDismiss().then((retval) => {
      this.questions.push(retval.data);
    });
    return await modal.present();
  }

  async editQModal(pos) {
    const modal = await this.modalController.create({
      component: QuestionModalPage,
      componentProps: {
        question: this.questions[pos].question,
        response_1: this.questions[pos].response_1,
        response_2: this.questions[pos].response_2,
        response_3: this.questions[pos].response_3,
        response_4: this.questions[pos].response_4,
        answer: this.questions[pos].answer,
      },
    });
    modal.onDidDismiss().then((retval) => {
      this.questions[pos] = retval.data;
    });
    return await modal.present();
  }

  getTempAns(pos, ansPos) {
    return pos == (ansPos);
  }

  addQuestion() {
    this.addQModal();
  }

  editItem(pos) {
    this.editQModal(pos);
  }

  deleteItem(position) {
    this.questions.splice(position, 1);
  }

  newQuestion(question) {
    return {
      question: question.q,
      response_1: question.r1,
      response_2: question.r2,
      response_3: question.r3,
      response_4: question.r4,
      answer: question.a
    };
  }
}
