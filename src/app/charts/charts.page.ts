import { UserTemplate } from './../User/userTemplate';
import { ChartsService } from './../Services/charts.service';
import { Storage } from '@ionic/storage-angular';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  @ViewChild('bestAnsSport') barCanvas1: ElementRef;
  private barChart1: Chart;

  @ViewChild('worstAnsSport') barCanvas2: ElementRef;
  private barChart2: Chart;

  @ViewChild('pieCanvas') pieCanvas: ElementRef;
  private pieChart: Chart;

  user = UserTemplate;
  pos: number;

  constructor(
    private storage: Storage,
    private navParams: NavParams,
    private modalController: ModalController,
    private chartService: ChartsService
  ) {}

  ngOnInit() {
    this.pos = this.navParams.get('user');
    this.getuser();
  }

  // Getting the different charts, using a service
  ionViewDidEnter() {
    this.barChart1 = this.chartService.displayBarChart(this.user, this.barCanvas1, "Correct")
    this.barChart2 = this.chartService.displayBarChart(this.user, this.barCanvas2, "Incorrect")
    this.pieChart = this.chartService.displayPieChart(this.user, this.pieCanvas)
  }

  exit() {
    this.modalController.dismiss();
  }

  async getuser() {
    let user = await this.storage.get('players');
    this.user = user[this.pos];
  }
}
