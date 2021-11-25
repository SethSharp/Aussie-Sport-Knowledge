import { UserTemplate } from './../User/userTemplate';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccessStorageService {
  currentPlayers;
  host;

  constructor(private storage: Storage, private route: Router) {}

  async getUsers() {
    this.currentPlayers = await this.storage.get('players');
  }

  async loadApp() {
    const storage = await this.storage.create();
    // await this.storage.clear();
    // Setting default values, mainuser == null is used to our advantage
    if ((await this.storage.get('mainuser')) == null) {
      this.display();
    }
    // if ((await this.storage.get('players')) == null) {
    //   await this.storage.set('players', []);
    // }
    // if ((await this.storage.get('selectedPlayers')) == null) {
    //   await this.storage.set('selectedPlayers', []);
    // }
  }

  async display() {
    await this.route.navigateByUrl('/login-page');
  }

  async setData(x, y) {
    await this.storage.set(x, y);
  }

  // Function to do heavy lifting after a mutliplayer game
  async updateMultiplayer(players) {
    await this.getUsers();
    // Updating user data
    for (let i = 0; i < players.length; i++) {
      let id = players[i].id;
      this.currentPlayers[id] = players[i];
    }
    await this.storage.set('selectedPlayers', []);
    await this.storage.set('players', this.currentPlayers);
  }

  // Sets up the main user (Any from the players or new one)
  // SO anyone can be host, otherwise the original host wouldn't get any chance to get points in mutltiplayer
  async login(name) {
    // await this.getUsers();

    // let userIndex = this.getExisitingUser(name);
    // let newMainUser = UserTemplate;

    // // New user
    // if (userIndex == -1) {
    //   newMainUser.name = name;
    // } else {
    //   newMainUser = this.currentPlayers[userIndex];
    //   this.currentPlayers.splice(userIndex, 1);
    //   // Need to reset id's
    //   for (let i = userIndex; i < this.currentPlayers.length; i++) {
    //     this.currentPlayers[i].id = i;
    //   }
    // }
    // newMainUser.id = -1;
    // await this.storage.set('mainuser', newMainUser);
    // await this.storage.set('players', this.currentPlayers);

  }

  // Logs out main user, by resetting their id and adding to normal plauers
  async logout(mainuser) {
    await this.getUsers();
    mainuser.id = this.currentPlayers.length;
    let newMain = UserTemplate;
    for (let key in mainuser) {
      newMain[key] = mainuser[key]
    }
    this.currentPlayers.push(newMain);
    await this.storage.set('mainuser', null);
    await this.storage.set('players', this.currentPlayers);
  }

  // Function to check if user exists, either way returns an index
  getExisitingUser(n) {
    // If still -1, then user doesn't exist
    let index = -1;
    for (let i = 0; i < this.currentPlayers.length; i++) {
      if (this.currentPlayers[i].name == n) {
        index = i;
        break;
      }
    }
    return index;
  }


  // Apart of the new use for this service
  async addUserLocally(user:any) {
    await this.storage.set('mainuser', user);
  }
}
