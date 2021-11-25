import { File } from '@ionic-native/file/ngx';
import { ComponentsModule } from './components.module';
import { IonicStorageModule } from '@ionic/storage-angular';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx'

// Server stuff
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), ComponentsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SplashScreen, ImagePicker, File],
  bootstrap: [AppComponent],
})
export class AppModule {
}
