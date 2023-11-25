import { TestBed } from '@angular/core/testing';

import { EditUserProfileService } from './edituserprofile.service';


describe('EdituserprofileService', () => {
  let service: EditUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
