import { Injectable } from '@angular/core';
import { Entry } from './entry';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntryService {
    private entriesUrl = 'https://cors-anywhere.herokuapp.com/https://emoncms.org/feed/data.json'
    private socket;

    constructor (private http: Http) {}

    // get("/api/entries")
    getEntries(start: Date): Promise<Entry[]> {
      return this.http.get(this.entriesUrl, {params: {
        apikey: '3bc0cbb9b69e857a73387efc8b58c899',
        id: 392814,
        start: 1562131976903,
        end: 1562218344836,
        interval: 60
      }}).toPromise()
                 .then(response => response.json() as Entry[])
                 .then((entries: Entry[]) => {
                   return entries.map(entry => {
                     entry.timestamp = new Date(entry.timestamp);
                     return entry;
                   });
                 })
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
