import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from './question';

import { NRL } from '../questionFolder/NRL/NRL';
import { NRLMEDIUM } from './../questionFolder/NRL/NRLMEDIUM';
import { NRLHARD } from './../questionFolder/NRL/NRLHARD';

import { AFL } from '../questionFolder/AFL/AFL';
import { AFLMEDIUM } from '../questionFolder/AFL/AFLMEDIUM';
import { AFLHARD } from '../questionFolder/AFL/AFLHARD';

import { CRICKET } from './../questionFolder/CRICKET/CRICKET';
import { CRICKETHARD } from './../questionFolder/CRICKET/CRICKETHARD';
import { CRICKETMEDIUM } from './../questionFolder/CRICKET/CRICKETMEDIUM';
import { CUSTOM } from './TEMP';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor() {}

  getQuiz(title, mode) {
    switch (title) {
      case 'NRL':
        {
          if (mode == 'EASY') {
            return NRL;
          } else if (mode == 'MEDI') {
            return NRLMEDIUM;
          } else if (mode == 'HARD') {
            return NRLHARD;
          }
        }
        break;
      case 'AFL':
        {
          if (mode == 'EASY') {
            return AFL;
          } else if (mode == 'MEDI') {
            return AFLMEDIUM;
          } else if (mode == 'HARD') {
            return AFLHARD;
          }
        }
        break;
      case 'CRI':
        {
          if (mode == 'EASY') {
            return CRICKET;
          } else if (mode == 'MEDI') {
            return CRICKETMEDIUM;
          } else if (mode == 'HARD') {
            return CRICKETHARD;
          }
        }
        break;
      default: {
        return NRL;
      }
    }
  }

  getQuestions(t="", m=""): Observable<Question[]> {
    let typeOfQuestion: any;
    if (t == "") {
      typeOfQuestion = CUSTOM
    } else {
      typeOfQuestion = this.getQuiz(t, m)
    }
    const question = of(typeOfQuestion); //returns an Observable<Question[]> that emits a single value, the array of questions
    return question;
  }
}
