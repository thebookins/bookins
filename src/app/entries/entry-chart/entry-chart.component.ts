import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';



@Component({
  selector: 'entry-chart',
  templateUrl: './entry-chart.component.html',
  styleUrls: ['./entry-chart.component.css'],
  providers: [EntryService]
})

export class EntryChartComponent implements OnInit {
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
          {color: 'blue', targetAxisIndex: 0},
          {type: 'area', lineWidth: 0, targetAxisIndex: 1},
          {type: 'area', lineWidth: 0, targetAxisIndex: 1}
        ],
        height: 500
    };


    var tmp = [];
    this.entryService
    .getEntries(minVal)
    .then((entries: Entry[]) => {
      tmp.push(['Date', 'Roof', 'Tank', 'Inlet', 'Solar', 'Backup']);
      for (var e of entries) {
        tmp.push([e.timestamp, e.status.roof, e.status.tank, e.status.inlet, e.status.solar, e.status.backup]);
      }
      if (entries.length > 0) {
        this.data = tmp;
      }
    });
  }
}
