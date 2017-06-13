// TODO: consider changing this to a live status panel with speedo graphs rather than text

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';

@Component({
  selector: 'entry-latest',
  templateUrl: './entry-latest.component.html',
  styleUrls: ['./entry-latest.component.css'],
  providers: [EntryService]
})


export class EntryLatestComponent implements OnInit, OnDestroy {

  entry;
  connection;

  public chartData = [
    ['Label', 'Value'],
    ['Roof', 120],
    ['Tank', 80],
    ['Inlet', 40]
  ];

  public chartOptions = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom: 75, yellowTo: 90,
          minorTicks: 5
      };

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.connection = this.entryService.subscribe().subscribe(message => {
      console.log('got message');
      this.entry = message;
      this.chartData[1][1] = this.entry.status.roof;
      this.chartData[2][1] = this.entry.status.tank;
      this.chartData[3][1] = this.entry.status.inlet;
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
