import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RequestData } from "../request-data"
import { MapSelectorComponent } from './map-selector.component';
import { Component, Input } from '@angular/core';
import { ButtonListComponent } from '../button-list/button-list.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-button-list',
  template: '',
  providers: [
    {
      provide: ButtonListComponent,
      useClass: ButtonListComponentStub
    }
  ],
})
class ButtonListComponentStub {
  setSettings(list_data: string[]) { };
  reset() { };
  @Input() ContentType = '';
  @Input() Name = '';
}

describe('MapSelectorComponent', () => {
  let component: MapSelectorComponent;
  let fixture: ComponentFixture<MapSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapSelectorComponent, ButtonListComponent],
      imports: [MatAutocompleteModule, ReactiveFormsModule, FormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MapSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set settings', fakeAsync(() => {
    let test_data: RequestData = {
      data:
      {
        "map_name": 'de_ancient',
        "weapons": {
          "Kill": ["F", "Y"],
          "CT": {
            "Allowed": ["A", "B"],
            "Forbidden": ["C", "D"]
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
          "CT": ["CTSpawn", "Water"],
          "T": ["TSpawn", "Alley"]
        },
        "use_weapons_classes": {
          "CT": "weapons",
          "Kill": "weapons",
          "T": "weapons"
        },
        "times": {
          "start": 18,
          "end": 162
        }
      }, performScan: false
    }
    spyOn(component, "submitMap")
    expect(component.Children.length).toBe(2)
    const ButtonChild1: ButtonListComponent = component.Children.get(0)!
    expect(ButtonChild1.Name).toBe("CT_Positions")
    expect(ButtonChild1.ContentType).toBe(component.selectedMap)
    const ButtonChild2: ButtonListComponent = component.Children.get(1)!
    expect(ButtonChild2.Name).toBe("T_Positions")
    expect(ButtonChild2.ContentType).toBe(component.selectedMap)
    spyOn(ButtonChild1, "setSettings")
    spyOn(ButtonChild2, "setSettings")
    component.setSettings(test_data)
    tick()
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.submitMap).toHaveBeenCalled()
      expect(component.selectedMap).toBe("de_ancient")
      expect(ButtonChild1.ContentType).toBe("de_ancient")
      expect(ButtonChild2.ContentType).toBe("de_ancient")
      expect(ButtonChild1.setSettings).toHaveBeenCalledWith(["CTSpawn", "Water"])
      expect(ButtonChild2.setSettings).toHaveBeenCalledWith(["TSpawn", "Alley"])
    });
  }));

  it('should reset', () => {
    component.selectedMap = "de_nuke"
    spyOn(component, "submitMap")
    fixture.detectChanges();
    const ButtonChild1: ButtonListComponent = component.Children.get(0)!
    const ButtonChild2: ButtonListComponent = component.Children.get(1)!
    spyOn(ButtonChild1, "reset")
    spyOn(ButtonChild2, "reset")
    component.reset()
    expect(component.selectedMap).toBe("de_dust2")
    expect(component.submitMap).toHaveBeenCalled()
    expect(ButtonChild1.reset).toHaveBeenCalled()
    expect(ButtonChild2.reset).toHaveBeenCalled()
  });

  it('should updateCTPositions', () => {
    spyOn(component.ctEvent, "emit")
    component.updateCTPositions(["TSpawn", "Alley"])
    expect(component.ctEvent.emit).toHaveBeenCalledWith(["TSpawn", "Alley"])
  });

  it('should updateTPositions', () => {
    spyOn(component.tEvent, "emit")
    component.updateTPositions(["CTSpawn", "Water"])
    expect(component.tEvent.emit).toHaveBeenCalledWith(["CTSpawn", "Water"])
  });

  it('should submitMap', () => {
    spyOn(component.mapEvent, "emit")
    component.selectedMap = "de_overpass"
    fixture.detectChanges();
    component.submitMap()
    expect(component.mapEvent.emit).toHaveBeenCalledWith("de_overpass")
  });



});
