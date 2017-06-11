import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryChartComponent } from './entry-chart.component';

describe('EntryChartComponent', () => {
  let component: EntryChartComponent;
  let fixture: ComponentFixture<EntryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
