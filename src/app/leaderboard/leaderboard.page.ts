import { User } from './../userInfo';
import { USERS } from './../users';
import { UserServiceService } from './../user-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserServiceService
  ) {}

  ngOnInit() {this.getUsers();}

  sortUserArray(users) {
    let n = users.length
    for (let startPos = 0; startPos < n; startPos++) { // Selection sort
      let minPos = startPos

      for (let i = minPos+1; i < n; i++) {
        if (users[i].totalScore > users[minPos].totalScore) {
          minPos = i;
        }
      }
      let temp = users[startPos]
      users[startPos] = users[minPos]
      users[minPos] = temp
    }
    return users
  }
  getUsers(): void {
    this.userService.getUser(USERS).subscribe((user) => (this.users = user));
    this.users = this.sortUserArray(this.users)
  }


}
