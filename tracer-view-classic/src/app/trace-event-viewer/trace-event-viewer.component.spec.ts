import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceEventViewerComponent } from './trace-event-viewer.component';

describe('TraceEventViewerComponent', () => {
  let component: TraceEventViewerComponent;
  let fixture: ComponentFixture<TraceEventViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceEventViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceEventViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
