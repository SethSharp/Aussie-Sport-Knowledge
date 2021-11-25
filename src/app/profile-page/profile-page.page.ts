import { File } from '@ionic-native/file/ngx';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Router } from '@angular/router';
import { AccessStorageService } from './../Services/access-storage.service';
import { ChartsService } from './../Services/charts.service';

import { UserTemplate } from './../User/userTemplate';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Storage } from '@ionic/storage-angular';

Chart.register(...registerables);

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {
  @ViewChild('bestAnsSport') barCanvas1: ElementRef;
  private barChart1: Chart;

  @ViewChild('worstAnsSport') barCanvas2: ElementRef;
  private barChart2: Chart;

  @ViewChild('pieCanvas') pieCanvas: ElementRef;
  private pieChart: Chart;

  images:any[] = [];
  imageFile: any; // Eventually add to user in storage

  txt = '';
  btnIcon = 'arrow-back-outline';
  identifier: String;
  bio: String;
  points: Number;

  user = UserTemplate;
  data = [];


  constructor(
    private storage: Storage,
    public file: File,
    private chartService: ChartsService,
    private router: Router,
    private accessStorage: AccessStorageService,
  ) {}

  ngOnInit() {
    this.getuser();
  }

  async ionViewDidEnter() {
    this.barChart1 = this.chartService.displayBarChart(
      this.user,
      this.barCanvas1,
      'Correct'
    );
    this.barChart2 = this.chartService.displayBarChart(
      this.user,
      this.barCanvas2,
      'Incorrect'
    );
    this.pieChart = this.chartService.displayPieChart(
      this.user,
      this.pieCanvas
    );
  }

  imageSelections(files) {
    let fileReader = new FileReader()
    fileReader.onload = e => {
      this.imageFile = fileReader.result
      this.saveUser()
    }
    fileReader.readAsDataURL(files[0])
  }

  async saveUser() {
    this.user.img = this.imageFile
    await this.storage.set('mainuser', this.user);
  }

  async logOut() {
    await this.storage.set('mainuser', this.user);
    this.barChart1.destroy();
    this.barChart2.destroy();
    this.pieChart.destroy();
    this.accessStorage.logout(this.user);
    this.router.navigateByUrl('/login-page');
  }

  async getuser() {
    this.user = await this.storage.get('mainuser');
    console.log(this.user);
    this.imageFile = await this.storage.get('profilePic');
  }
}
