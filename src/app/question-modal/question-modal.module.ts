import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionModalPageRoutingModule } from './question-modal-routing.module';

import { QuestionModalPage } from './question-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionModalPageRoutingModule
  ],
  declarations: [QuestionModalPage]
})
export class QuestionModalPageModule {}
