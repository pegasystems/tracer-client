import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceEventDialogComponent } from './trace-event-dialog.component';

describe('TraceEventDialogComponent', () => {
  let component: TraceEventDialogComponent;
  let fixture: ComponentFixture<TraceEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
