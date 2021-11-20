import { AlertController } from '@ionic/angular';
import { AccessStorageService } from './../Services/access-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    private alertController: AlertController
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
    // Uses a service to use a few functions
    this.accessStorage.login(this.username);
    this.route.navigateByUrl('/home');
  }
}
