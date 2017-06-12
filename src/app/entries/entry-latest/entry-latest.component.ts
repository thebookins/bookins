import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.connection = this.entryService.subscribe().subscribe(message => {
      this.entry = message;
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
