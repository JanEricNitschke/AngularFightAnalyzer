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
  it('list should match to input',
    (done: DoneFn) => {
      service.getList("de_ancient").subscribe((value) => {
        expect(value).toEqual(['Alley', 'BackHall', 'BombsiteA', 'BombsiteB', 'CTSpawn', 'House', 'MainHall', 'Middle', 'Outside', 'Ramp', 'Ruins', 'SideEntrance', 'SideHall', 'TSideLower', 'TSideUpper', 'TSpawn', 'TopofMid', 'Tunnel', 'Water', 'None'])
      });
      service.getList("Classes").subscribe((value) => {
        expect(value).toEqual(["Pistols", "Heavy", "SMG", "Rifle", "Grenade", "Equipment"])
        done();
      });
    });
});
