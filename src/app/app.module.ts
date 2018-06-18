import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GoogleChart } from 'angular2-google-chart/directives/angular2-google-chart.directive';

import { AppComponent } from './app.component';
import { EntryDetailsComponent } from './entries/entry-details/entry-details.component';
import { EntryChartComponent } from './entries/entry-chart/entry-chart.component';
import { EntryLatestComponent } from './entries/entry-latest/entry-latest.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryDetailsComponent,
    EntryChartComponent,
    GoogleChart,
    EntryLatestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
