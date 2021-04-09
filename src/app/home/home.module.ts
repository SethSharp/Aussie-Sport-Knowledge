import { HomePageComponent } from '../Components/home-page/home-page.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, ProfileComponent, HomePageComponent],
})
export class HomePageModule {}
