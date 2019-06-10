import { TestBed } from '@angular/core/testing';

import { TracerLocalStatusService } from './tracer-local-status.service';

describe('TracerLocalStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TracerLocalStatusService = TestBed.get(TracerLocalStatusService);
    expect(service).toBeTruthy();
  });
});
