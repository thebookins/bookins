import { Component } from '@angular/core';

@Component({
  selector: 'entry-chart',
  templateUrl: './entry-chart.component.html',
  styleUrls: ['./entry-chart.component.css']
})

export class EntryChartComponent {
  public chartData = [
      ['Date', 'Sales Percentage'],
      [new Date(2016, 3, 22), 78],
      [new Date(2016, 3, 21, 9, 30, 2), 88],
      [new Date(2016, 3, 20), 67],
      [new Date(2016, 3, 19, 8, 34, 7), 98],
      [new Date(2016, 3, 18, 15, 34, 7), 95],
      [new Date(2016, 3, 16, 7, 30, 45), 89],
      [new Date(2016, 3, 16, 15, 40, 35), 68]
  ];

  public chartOptions = {
      legend: {
          position: 'bottom'
      },
      title: "Solastat data",
      // hAxis: {title: 'time (s)', minValue: minVal, maxValue: maxVal},
      hAxis: {title: 'time (s)'},
      vAxes: [{
        title: 'temperature (\u2103)',
        minValue: 0,
        maxValue: 100
      }, {
        minValue: 0,
        maxValue: 1
      }],
      interpolateNulls: false,
      lineWidth: 1,
      pointSize: 0,
      seriesType: 'line',
      series: [
        {color: 'red', targetAxisIndex: 0},
        {color: 'green', targetAxisIndex: 0},
        {color: 'blue', targetAxisIndex: 0},
        {type: 'area', lineWidth: 0, targetAxisIndex: 1},
        {type: 'area', lineWidth: 0, targetAxisIndex: 1}
      ]
  };

  constructor() { }

}
