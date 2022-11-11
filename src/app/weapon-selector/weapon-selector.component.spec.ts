import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RequestData } from "../request-data"
import { Component, Input } from '@angular/core';
import { WeaponSelectorComponent } from './weapon-selector.component';
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

describe('WeaponSelectorComponent', () => {
  let component: WeaponSelectorComponent;
  let fixture: ComponentFixture<WeaponSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeaponSelectorComponent, ButtonListComponent],
      imports: [MatAutocompleteModule, ReactiveFormsModule, FormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeaponSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set settings allowed forbidden', fakeAsync(() => {
    let test_data: RequestData = {
      data:
      {
        "map_name": '',
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
          "CT": [],
          "T": []
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
    spyOn(component.TypeEvent, "emit")
    component.only_allowed = false
    component.Name = "CT"
    component.Type = "Classes"
    fixture.detectChanges();
    expect(component.Children.length).toBe(2)
    const ButtonChild1: ButtonListComponent = component.Children.get(0)!
    expect(ButtonChild1.Name).toBe("Allowed")
    expect(ButtonChild1.ContentType).toBe(component.Type)
    const ButtonChild2: ButtonListComponent = component.Children.get(1)!
    expect(ButtonChild2.Name).toBe("Forbidden")
    expect(ButtonChild2.ContentType).toBe(component.Type)
    spyOn(ButtonChild1, "setSettings")
    spyOn(ButtonChild2, "setSettings")
    component.setSettings(test_data)
    tick()
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.TypeEvent.emit).toHaveBeenCalled()
      expect(component.Type).toBe("Weapons")
      expect(ButtonChild1.setSettings).toHaveBeenCalledWith(["A", "B"])
      expect(ButtonChild2.setSettings).toHaveBeenCalledWith(["C", "D"])
    });
  }));

  it('should set settings only', fakeAsync(() => {
    let test_data: RequestData = {
      data:
      {
        "map_name": '',
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
          "CT": [],
          "T": []
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
    spyOn(component.TypeEvent, "emit")
    component.only_allowed = true
    component.Name = "Kill"
    component.Type = "Classes"
    fixture.detectChanges();
    expect(component.Children.length).toBe(1)
    const ButtonChild1: ButtonListComponent = component.Children.get(0)!
    expect(ButtonChild1.Name).toBe(component.Type)
    expect(ButtonChild1.ContentType).toBe(component.Type)
    spyOn(ButtonChild1, "setSettings")
    component.setSettings(test_data)
    tick()
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.TypeEvent.emit).toHaveBeenCalled()
      expect(component.Type).toBe("Weapons")
      expect(ButtonChild1.setSettings).toHaveBeenCalledWith(["F", "Y"])
    });
  }));

  it('should reset', () => {
    component.Type = "Weapons"
    component.only_allowed = false
    spyOn(component.TypeEvent, "emit")
    fixture.detectChanges();
    const ButtonChild1: ButtonListComponent = component.Children.get(0)!
    const ButtonChild2: ButtonListComponent = component.Children.get(1)!
    spyOn(ButtonChild1, "reset")
    spyOn(ButtonChild2, "reset")
    component.reset()
    expect(component.Type).toBe("Classes")
    expect(component.TypeEvent.emit).toHaveBeenCalled()
    expect(ButtonChild1.reset).toHaveBeenCalled()
    expect(ButtonChild2.reset).toHaveBeenCalled()
  });

  it('should update allowed', () => {
    spyOn(component.AllowedEvent, "emit")
    component.updateAllowed(["AB", "CD"])
    expect(component.AllowedEvent.emit).toHaveBeenCalledWith(["AB", "CD"])
  });

  it('should update forbidden', () => {
    spyOn(component.ForbiddenEvent, "emit")
    component.updateForbidden(["BA", "DC"])
    expect(component.ForbiddenEvent.emit).toHaveBeenCalledWith(["BA", "DC"])
  });

  it('should submit type', () => {
    spyOn(component.TypeEvent, "emit")
    spyOn(component.AllowedEvent, "emit")
    spyOn(component.ForbiddenEvent, "emit")
    component.Type = "Weapons"
    component.Allowed = ["BA", "DC"]
    component.Forbidden = ["AB", "CD"]
    fixture.detectChanges();
    component.submitType()
    expect(component.TypeEvent.emit).toHaveBeenCalledWith("Weapons")
    expect(component.AllowedEvent.emit).toHaveBeenCalledWith(["BA", "DC"])
    expect(component.ForbiddenEvent.emit).toHaveBeenCalledWith(["AB", "CD"])
  });


});
