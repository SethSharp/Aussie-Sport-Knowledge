import { User } from './userInfo';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor() {}
  getUser(typeOfUser: any): Observable<User[]> {
    const user = of(typeOfUser); //returns an Observable<Hero[]> that emits a single value, the array of mock heroes
    return user;
  }
}
