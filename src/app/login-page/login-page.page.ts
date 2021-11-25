import { AlertController } from '@ionic/angular';
import { AccessStorageService } from './../Services/access-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../Services/backend.service';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPage implements OnInit {

  username = '';

  constructor(
    private route: Router,
    private accessStorage: AccessStorageService,
    private alertController: AlertController,
    private backEnd: BackendService
  ) {}

  ngOnInit() {}

  // Display an alert, if the name entered is ""
  async displayAlert(title) {
    const alert = await this.alertController.create({
      header: title,
    });
    await alert.present();
  }

  async signUp() {
    if (this.username == '') {
      // Set some text on the page to this \/
      this.displayAlert("Please enter in a name")
      return;
    }

    this.backEnd.checkUsername(this.username).subscribe((exists) => {
      if (exists) {
        // Add the user to the local store, IE, the data
        this.accessStorage.addUserLocally(exists).then(()=> {
          console.log("Exisitng user loaded into local storage")
          this.route.navigateByUrl('/home');
        })
      } else {
        // create a new user entry with default data
        this.backEnd.createNewUser(this.username).subscribe((newUser) => {
          this.accessStorage.addUserLocally(newUser).then(()=>{
            console.log("User added to local storage");
            this.route.navigateByUrl('/home');
          });
        }); // soon will add password
      }
    });
  }
}
