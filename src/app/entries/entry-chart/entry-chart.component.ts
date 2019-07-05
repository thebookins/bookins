import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';

declare var google:any;

@Component({
  selector: 'entry-chart',
  templateUrl: './entry-chart.component.html',
  styleUrls: ['./entry-chart.component.css'],
  providers: [EntryService]
})

export class EntryChartComponent implements OnInit {
  public roof: any[]
  public tank: any[]
  public inlet: any[]

  public data: any[]

  public options

  // public chartData = [
  //     ['Date', 'Roof', 'Tank', 'Inlet']
  //     [new Date(2016, 3, 16, 7, 30, 45), 89, 23, 15],
  //     [new Date(2016, 3, 16, 15, 40, 35), 68, 45, 23],
  //     [new Date(2016, 3, 18, 15, 34, 7), 95, 45, 23],
  //     [new Date(2016, 3, 19, 8, 34, 7), 98, 67, 12],
  //     [new Date(2016, 3, 20), 67, 45, 32],
  //     [new Date(2016, 3, 21, 9, 30, 2), 88, 34, 23],
  //     [new Date(2016, 3, 22), 78, 45, 12]
  // ];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    var now = new Date();
    var minVal = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    var maxVal = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);

    this.options = {
        legend: {
            position: 'bottom'
        },
        title: "Solastat data",
        hAxis: {title: 'time', minValue: minVal, maxValue: maxVal},
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
          // {color: 'blue', targetAxisIndex: 0},
          // {type: 'area', lineWidth: 0, targetAxisIndex: 1},
          // {type: 'area', lineWidth: 0, targetAxisIndex: 1}
        ],
        height: 500
    };


    // roof
    this.entryService
    .getEntries(minVal, 392814)
    .then((entries: Entry[]) => {
      var tmp = [];
      tmp.push(['Date', 'Roof']);
      for (var e of entries) {
        tmp.push([e.timestamp, e.value]);
      }
      if (entries.length > 0) {
        this.roof = google.visualization.arrayToDataTable(tmp);
      }
    })
    .then(() => {
      // tank
      this.entryService
      .getEntries(minVal, 392815)
      .then((entries: Entry[]) => {
        var tmp = [];
        tmp.push(['Date', 'Tank']);
        for (var e of entries) {
          tmp.push([e.timestamp, e.value]);
        }
        if (entries.length > 0) {
          this.tank = google.visualization.arrayToDataTable(tmp);
        }
      })
    })
    .then(() => {
      console.log(this.roof)
      this.data = google.visualization.data.join(this.roof, this.tank, 'full', [[0, 0]], [1], [1])
      console.log(this.data)
    })
  }
}
//
//
//
// function drawChart() {
//     var data1 = new google.visualization.DataTable();
//     data1.addColumn('number', 'X');
//     data1.addColumn('number', 'Y 1');
//
//     data1.addRows([
//         [1, 3],
//         [2, 6],
//         [5, 5],
//         [6, 8],
//         [8, 2],
//         [9, 5],
//         [10, 5],
//         [12, 4],
//         [13, 8]
//     ]);
//
//     var data2 = new google.visualization.DataTable();
//     data2.addColumn('number', 'X');
//     data2.addColumn('number', 'Y 2');
//
//     data2.addRows([
//         [1, 5],
//         [3, 1],
//         [4, 3],
//         [5, 9],
//         [6, 4],
//         [8, 5],
//         [9, 7],
//         [11, 7],
//         [16, 3]
//     ]);
//
//     var joinedData = google.visualization.data.join(data1, data2, 'full', [[0, 0]], [1], [1]);
//
//     var chart = new google.visualization.LineChart(document.querySelector('#chart_div'));
//     chart.draw(joinedData, {
//         height: 300,
//         width: 600,
//         interpolateNulls: true
//     });
// }
// google.load('visualization', '1', {packages:['corechart'], callback: drawChart});
