import { Injectable } from '@angular/core';

//Helps simulate getting data from the server with RxJS of() function
import { Observable, of } from 'rxjs';

import { Question } from './question';
import { QUESTIONS } from './mock-questions';
import { NRL } from './NRL/NRL';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor() {}
  getQuestions(typeOfQuestion: any): Observable<Question[]> {
    const question = of(typeOfQuestion); //returns an Observable<Hero[]> that emits a single value, the array of mock heroes
    return question;
  }
}
