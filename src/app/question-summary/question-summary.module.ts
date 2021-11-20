import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionSummaryPageRoutingModule } from './question-summary-routing.module';

import { QuestionSummaryPage } from './question-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionSummaryPageRoutingModule
  ],
  declarations: [QuestionSummaryPage]
})
export class QuestionSummaryPageModule {}
