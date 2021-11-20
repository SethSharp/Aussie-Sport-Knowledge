import { ChartsPage } from './../charts/charts.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  // ALl users and the host/main user
  users;
  host;

  // Back button properties, text is "" so its just an arrow
  txt=""
  btnIcon = "arrow-back-outline"

  constructor(
    private storage: Storage,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getUsers();
  }

  // Currently this sorts all the users based on their score
  sortUserArray() {
    let users = this.users
    let n = users.length;
    // Selection sort
    for (let startPos = 0; startPos < n; startPos++) {
      let minPos = startPos;
      for (let i = minPos + 1; i < n; i++) {
        if (users[i].score > users[minPos].score) {
          minPos = i;
        }
      }
      let temp = users[startPos];
      users[startPos] = users[minPos];
      users[minPos] = temp;
    }
  }


  async viewData(i) {
    const modal = await this.modalController.create({
      component: ChartsPage,
      componentProps: {
        user: i,
      },
    });
    // Dont need to return anything on dismiss, just a display page
    return await modal.present();
  }

  async getUsers() {
    // Loads users and sorts them based on score
    this.users = await this.storage.get("players");
    this.host = await this.storage.get("mainuser")
    this.sortUserArray()
  }
}
