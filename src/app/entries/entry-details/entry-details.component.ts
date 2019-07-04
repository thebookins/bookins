import { Component, Input } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';

@Component({
  selector: 'entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.css']
})

export class EntryDetailsComponent {
  @Input()
  entry: Entry;

  @Input()
  createHandler: Function;

  constructor (private entryService: EntryService) {}

  // createEntry(entry: Entry) {
  //   this.entryService.createEntry(entry).then((newEntry: Entry) => {
  //     this.createHandler(newEntry);
  //   });
  // }

}
