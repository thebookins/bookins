import { Injectable } from '@angular/core';
import { Entry } from './entry';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntryService {
    private entriesUrl = '/api/entries';
    private socket;

    constructor (private http: Http) {}

    // get("/api/entries")
    getEntries(start: Date): Promise<Entry[]> {
      return this.http.get(this.entriesUrl, {params: {start: start.toUTCString()}})
                 .toPromise()
                 .then(response => response.json() as Entry[])
                 .then((entries: Entry[]) => {
                   return entries.map(entry => {
                     entry.timestamp = new Date(entry.timestamp);
                     return entry;
                   });
                 })
                 .catch(this.handleError);
    }

    getEntries()

    // post("/api/entries")
    createEntry(newEntry: Entry): Promise<Entry> {
      return this.http.post(this.entriesUrl, newEntry)
                 .toPromise()
                 .then(response => response.json() as Entry)
                 .catch(this.handleError);
    }

    subscribe() {
      let observable = new Observable(observer => {
        console.log('subscribing');
        this.socket = io();
        this.socket.on('state', (data) => {
          console.log('got state');
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      })
      return observable;
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
