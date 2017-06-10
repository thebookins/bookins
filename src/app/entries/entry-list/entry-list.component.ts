import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { EntryDetailsComponent } from '../entry-details/entry-details.component';

@Component({
  selector: 'entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
  providers: [EntryService]
})

export class EntryListComponent implements OnInit {

  entries: Entry[]
  selectedEntry: Entry

  constructor(private entryService: EntryService) { }

  ngOnInit() {
     this.entryService
      .getEntries()
      .then((entries: Entry[]) => {
        this.entries = entries;
        // this.entries = entries.map((entry) => {
        //   if (!contact.phone) {
        //     contact.phone = {
        //       mobile: '',
        //       work: ''
        //     }
        //   }
        //   return entry;
        // });
      });
  }

  private getIndexOfEntry = (entryId: String) => {
    return this.entries.findIndex((entry) => {
      return entry._id === entryId;
    });
  }

  selectEntry(entry: Entry) {
    this.selectedEntry = entry
  }

  createNewEntry() {
    var entry: Entry = {
      timestamp: new Date().toJSON(),
      status: {
        roof: 50,
        tank: 50,
        inlet: 50
      }
    };

    // By default, a newly-created contact will have the selected state.
    this.selectEntry(entry);
  }

  addEntry = (entry: Entry) => {
    this.entries.push(entry);
    this.selectEntry(entry);
    return this.entries;
  }
}
