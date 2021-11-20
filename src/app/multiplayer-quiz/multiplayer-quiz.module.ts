import { ComponentsModule } from './../components.module';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiplayerQuizPageRoutingModule } from './multiplayer-quiz-routing.module';

import { MultiplayerQuizPage } from './multiplayer-quiz.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MultiplayerQuizPageRoutingModule
  ],
  declarations: [MultiplayerQuizPage]
})
export class MultiplayerQuizPageModule {}
