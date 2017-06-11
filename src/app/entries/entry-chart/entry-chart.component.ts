import { Component } from '@angular/core';

@Component({
  selector: 'entry-chart',
  templateUrl: './entry-chart.component.html',
  styleUrls: ['./entry-chart.component.css']
})

export class EntryChartComponent {
  public scatter_ChartData = [
      ['Date', 'Sales Percentage'],
      [new Date(2016, 3, 22), 78],
      [new Date(2016, 3, 21, 9, 30, 2), 88],
      [new Date(2016, 3, 20), 67],
      [new Date(2016, 3, 19, 8, 34, 7), 98],
      [new Date(2016, 3, 18, 15, 34, 7), 95],
      [new Date(2016, 3, 16, 7, 30, 45), 89],
      [new Date(2016, 3, 16, 15, 40, 35), 68]
  ];

  public scatter_ChartOptions = {
      legend: {
          position: 'bottom'
      },
      title: 'Company Sales Percentage'
  };


  constructor() { }

}
