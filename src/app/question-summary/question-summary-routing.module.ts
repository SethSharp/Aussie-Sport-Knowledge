import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionSummaryPage } from './question-summary.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionSummaryPageRoutingModule {}
