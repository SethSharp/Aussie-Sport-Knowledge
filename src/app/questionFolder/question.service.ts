import { Injectable } from '@angular/core';

//Helps simulate getting data from the server with RxJS of() function
import { Observable, of } from 'rxjs';

import { Question } from './question';

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
