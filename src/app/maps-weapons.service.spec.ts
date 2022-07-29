import { TestBed } from '@angular/core/testing';

import { MapsWeaponsService } from './maps-weapons.service';

describe('MapsWeaponsService', () => {
  let service: MapsWeaponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsWeaponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
