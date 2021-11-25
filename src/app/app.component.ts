import { AccessStorageService } from './Services/access-storage.service';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { BackendService } from './Services/backend.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private backEnd: BackendService, private splashScreen: SplashScreen, private storageService: AccessStorageService) {
    this.storageService.loadApp()
  }

  async loadApp() {
    this.splashScreen.show()
  }
}
