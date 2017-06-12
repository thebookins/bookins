import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLatestComponent } from './entry-latest.component';

describe('EntryLatestComponent', () => {
  let component: EntryLatestComponent;
  let fixture: ComponentFixture<EntryLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
