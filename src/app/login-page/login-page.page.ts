import { USERS } from './../users';
import { UserServiceService } from './../user-service.service';
import { User } from './../userInfo';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  // Create an array that holds the user info
  // Then it can be compared
  username = '';
  password = '';
  users: User[] = [];

  constructor(private router: Router, private userService: UserServiceService) {}

  ngOnInit() {
    this.getUsers();
  }

  findUserName(u, p) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == u && this.users[i].password == p) {
        return this.users[i].name
      }
    }return false
  }
  login() {
    if (this.username.length > 0 && this.username) {
      let potentialUser = this.findUserName(this.username, this.password);
      //JSON.stringify(potentialUser)
      if (potentialUser != false) {
        this.router.navigateByUrl('/home/' + this.username);
      } else {
        alert('Username or password is incorrect');
      }
    }
  }
  getUsers(): void {
    this.userService.getUser(USERS).subscribe((user) => (this.users = user));
  }
}
