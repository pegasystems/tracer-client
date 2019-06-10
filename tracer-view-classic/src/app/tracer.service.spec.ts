import { TestBed, inject } from '@angular/core/testing';

import { TracerService } from './tracer.service';

describe('TracerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TracerService]
    });
  });

  it('should be created', inject([TracerService], (service: TracerService) => {
    expect(service).toBeTruthy();
  }));
});
