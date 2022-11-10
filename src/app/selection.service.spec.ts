import { TestBed } from '@angular/core/testing';
import { RequestData } from "./request-data"

import { SelectionService } from './selection.service';

describe('SelectionService', () => {
  let service: SelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('selection should be empty',
    (done: DoneFn) => {
      service.selectionObservable$.subscribe((value) => {
        let data = value.data;
        expect(data.map_name).toBe("");
        expect(data.times.start).toBe(0);
        expect(data.times.end).toBe(175);
        expect(value.performScan).toBe(true);
        expect(data.positions.CT).toEqual([]);
        done();
      });
    });
  it('selection should be test_Data',
    (done: DoneFn) => {
      let test_data: RequestData = {
        data:
        {
          "map_name": 'de_dust2',
          "weapons": {
            "Kill": [],
            "CT": {
              "Allowed": [],
              "Forbidden": []
            },
            "T": {
              "Allowed": [],
              "Forbidden": []
            }
          },
          "classes": {
            "Kill": [],
            "CT": {
              "Allowed": [],
              "Forbidden": []
            },
            "T": {
              "Allowed": [],
              "Forbidden": []
            }
          },
          "positions": {
            "CT": ["MidDoors", "TSpawn", "Long"],
            "T": []
          },
          "use_weapons_classes": {
            "CT": "weapons",
            "Kill": "weapons",
            "T": "weapons"
          },
          "times": {
            "start": 2,
            "end": 16
          }
        }, performScan: false
      }
      service.setSelection(test_data)
      service.selectionObservable$.subscribe((value) => {
        let data = value.data;
        expect(data.map_name).toBe("de_dust2");
        expect(data.times.start).toBe(2);
        expect(data.times.end).toBe(16);
        expect(value.performScan).toBe(false);
        expect(data.positions.CT).toEqual(["MidDoors", "TSpawn", "Long"]);
        done();
      });
    });
});
