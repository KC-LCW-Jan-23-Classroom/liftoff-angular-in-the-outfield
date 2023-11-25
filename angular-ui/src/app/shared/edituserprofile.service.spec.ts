import { TestBed } from '@angular/core/testing';

import { EdituserprofileService } from './edituserprofile.service';

describe('EdituserprofileService', () => {
  let service: EdituserprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdituserprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
