import { TestBed } from '@angular/core/testing';

import { InformationService } from './information.service';

describe('InformationService', () => {
  let service: InformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('information should match to input', (done: DoneFn) => {
    service.getInformation('Maps').subscribe((value) => {
      expect(value).toBe(
        "Select map and then the allowed positions of CT's and T's.<br>The players have to have been in one of the specified positions for their class.<br> If no positions are are set then every position is allowed.",
      );
    });
    service.getInformation('T').subscribe((value) => {
      expect(value).toEqual(
        "Select whether you want to filter directly by weapons or generally by classes for T's.<br>The players must have had at least one matching weapon in their inventory.<br> If nothing is specified then no filter is applied on the T's inventories.",
      );
      done();
    });
  });
});
