import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiplayerQuizPage } from './multiplayer-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: MultiplayerQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiplayerQuizPageRoutingModule {}
