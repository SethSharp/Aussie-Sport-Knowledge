import { User } from './../userInfo';
import { UserServiceService } from './../user-service.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { USERS } from './../users';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {
  identifier: String;
  bio: String;
  imgSrc: String;
  users: User[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserServiceService) {}

  ngOnInit() {
    this.getUsers();
    this.identifier = this.route.snapshot.paramMap.get('username');
    this.setUser(this.identifier)
  }

  findUserName(u) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].name == u) {
        return this.users[i];
      }
    }
    return false;
  }
  setUser(name) {
    while (true) {
      let potentialUser = this.findUserName(this.identifier);
      //JSON.stringify(potentialUser)
      if (potentialUser != false) {
        this.bio = potentialUser.description
        this.imgSrc = potentialUser.profilePicture
        break
      } else {
        alert('Username or password is incorrect');
      }
    }
  }
  navToHome() {
    this.router.navigateByUrl('/home');
  }
  editProfileModal() {
    //Opens a modal, which edits the contents of the array of the observable...

  }

  getUsers(): void {
    this.userService.getUser(USERS).subscribe((user) => (this.users = user));
  }
}
