
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizPagePageRoutingModule } from './quiz-page-routing.module';

import { QuizPagePage } from './quiz-page.page';
import { ComponentsModule } from './../components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    QuizPagePageRoutingModule
  ],
  declarations: [QuizPagePage]
})
export class QuizPagePageModule {}
