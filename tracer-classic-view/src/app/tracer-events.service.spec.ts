import { TestBed, inject } from '@angular/core/testing';

import { TracerEventsService } from './tracer-events.service';

describe('TracerEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TracerEventsService]
    });
  });

  it('should be created', inject([TracerEventsService], (service: TracerEventsService) => {
    expect(service).toBeTruthy();
  }));
});
