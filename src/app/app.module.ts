import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GoogleChart } from 'angular2-google-chart/directives/angular2-google-chart.directive';

import { AppComponent } from './app.component';
import { EntryDetailsComponent } from './entries/entry-details/entry-details.component';
import { EntryListComponent } from './entries/entry-list/entry-list.component';
import { EntryChartComponent } from './entries/entry-chart/entry-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryDetailsComponent,
    EntryListComponent,
    EntryChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GoogleChart
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
