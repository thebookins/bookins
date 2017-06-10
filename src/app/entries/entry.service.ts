import { Injectable } from '@angular/core';
import { Entry } from './entry';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntryService {
    private entriesUrl = '/api/entries';

    constructor (private http: Http) {}

    // get("/api/entries")
    getEntries(): Promise<Entry[]> {
      return this.http.get(this.entriesUrl)
                 .toPromise()
                 .then(response => response.json() as Entry[])
                 .catch(this.handleError);
    }

    // post("/api/entries")
    createEntry(newEntry: Entry): Promise<Entry> {
      return this.http.post(this.entriesUrl, newEntry)
                 .toPromise()
                 .then(response => response.json() as Entry)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
