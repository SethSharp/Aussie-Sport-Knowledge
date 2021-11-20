import { Chart, registerables } from 'chart.js';
import { Injectable } from '@angular/core';

Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  colour;

  constructor() {}

  // i just represents the type of data as seen below
  getUserData(user, i) {
    if (i == "Correct") {
      this.colour = 'rgb(0, 230, 0)';
      return [
        user.sports['NRL'][0],
        user.sports['AFL'][0],
        user.sports['CRI'][0],
      ];
    } else {
      this.colour = 'rgb(255, 0, 0)';
      return [
        user.sports['NRL'][1],
        user.sports['AFL'][1],
        user.sports['CRI'][1],
      ];
    }
  }

  // Creates and returns a chart based on the passed in values
  displayBarChart(user, barCanvas1, title) {
    // Determines the data to use
    let data = this.getUserData(user, title)
    let c = new Chart(barCanvas1.nativeElement, {
      type: 'bar',
      data: {
        labels: ['NRL', 'AFL', 'CRICKET'],
        datasets: [
          {
            label: title,
            data:
              data
            ,
            borderWidth: 1,
            backgroundColor: [this.colour],
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
      });
    return c
  }

  // Creates and returns a pie chart using the passed through data
  displayPieChart(user, canvas) {
    // Determine the data to use like before
    let data = [user.correct, user.incorrect];
    let c = new Chart(canvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [
          {
            label: 'Correct/incorrect',
            backgroundColor: ['rgb(0, 230, 0)', 'rgb(255, 0, 0)'],
            data: data,
          },
        ],
      },
    });
    return c
  }

}
