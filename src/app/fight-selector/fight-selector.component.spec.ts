import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Output, EventEmitter, } from '@angular/core';
import { FightSelectorComponent } from './fight-selector.component';
import { Router } from '@angular/router';
import { ConsentService } from '../consent.service';
import { NgcCookieConsentService, NgcStatusChangeEvent } from "ngx-cookieconsent";
import { of, Subject } from 'rxjs';
import { SelectionService } from '../selection.service';
import { MapSelectorComponent } from '../map-selector/map-selector.component';;
import { TimeSelectorComponent } from '../time-selector/time-selector.component';
import { WeaponSelectorComponent } from '../weapon-selector/weapon-selector.component';
import { RequestData } from "../request-data"

@Component({
  selector: 'router-outlet',
  template: ''
})
class MockRouterOutlet {
}

@Component({
  selector: 'app-weapon-selector',
  template: '',
  providers: [
    {
      provide: WeaponSelectorComponent,
      useClass: WeaponSelectorComponentStub
    }
  ]
})
class WeaponSelectorComponentStub {
  setSettings(settings: RequestData) { };
  reset() { };
  @Output() AllowedEvent = new EventEmitter<string[]>();
  @Output() ForbiddenEvent = new EventEmitter<string[]>();
  @Output() TypeEvent = new EventEmitter<string>();
}

@Component({
  selector: 'app-time-selector',
  template: '',
  providers: [
    {
      provide: TimeSelectorComponent,
      useClass: TimeSelectorComponentStub
    }
  ]
})
class TimeSelectorComponentStub {
  setSettings(settings: RequestData) { };
  reset() { };
  @Output() startEvent = new EventEmitter<string>();
  @Output() endEvent = new EventEmitter<string>();
  @Output() scanEvent = new EventEmitter<boolean>();
}

@Component({
  selector: 'app-map-selector',
  template: '',
  providers: [
    {
      provide: MapSelectorComponent,
      useClass: MapSelectorComponentStub
    }
  ]
})
class MapSelectorComponentStub {
  setSettings(settings: RequestData) { };
  reset() { };
  @Output() ctEvent = new EventEmitter<string[]>();
  @Output() tEvent = new EventEmitter<string[]>();
  @Output() mapEvent = new EventEmitter<string>();
}

const router = {
  navigate: jasmine.createSpy('navigate')
}

let SelectionServiceStub: Partial<SelectionService>;

SelectionServiceStub = {
  setSelection(selection: RequestData) { return selection.data.times.end }
};

describe('FightSelectorComponent', () => {
  let component: FightSelectorComponent;
  let fixture: ComponentFixture<FightSelectorComponent>;
  let ConsentServiceStub: Partial<ConsentService>;

  ConsentServiceStub = {
    consentGiven: false,
    cookie_name: 'SelectorSettings',
  };
  let NgcCookieConsentServiceStub: Partial<NgcCookieConsentService>;
  let statusChangeSource = new Subject<NgcStatusChangeEvent>();
  NgcCookieConsentServiceStub = {
    popupOpen$: of(),
    popupClose$: of(),
    initializing$: of(),
    initialized$: of(),
    initializationError$: of(),
    statusChange$: statusChangeSource.asObservable(),
    revokeChoice$: of(),
    noCookieLaw$: of(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FightSelectorComponent, MockRouterOutlet, WeaponSelectorComponent, MapSelectorComponent, TimeSelectorComponent],
      providers: [{ provide: Router, useValue: router }, { provide: ConsentService, useValue: ConsentServiceStub }, { provide: NgcCookieConsentService, useValue: NgcCookieConsentServiceStub }, { provide: SelectionService, useValue: SelectionServiceStub }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FightSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    expect(component.cookie_name).toBe("");
    fixture.detectChanges();
    expect(component.cookie_name).toBe('SelectorSettings');
  });

  it('setSettings should call children', () => {
    fixture.detectChanges();
    let test_data: RequestData = {
      data:
      {
        "map_name": '',
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
          "CT": [],
          "T": []
        },
        "use_weapons_classes": {
          "CT": "weapons",
          "Kill": "weapons",
          "T": "weapons"
        },
        "times": {
          "start": 0,
          "end": 175
        }
      }, performScan: true
    }
    expect(component.WeaponsChildren.length).toBe(3)
    const WeaponChild1: WeaponSelectorComponent = component.WeaponsChildren.get(0)!
    const WeaponChild2: WeaponSelectorComponent = component.WeaponsChildren.get(1)!
    const WeaponChild3: WeaponSelectorComponent = component.WeaponsChildren.get(2)!
    spyOn(component.MapComponent, 'setSettings');
    spyOn(component.TimeComponent, 'setSettings');
    spyOn(WeaponChild1, 'setSettings');
    spyOn(WeaponChild2, 'setSettings');
    spyOn(WeaponChild3, 'setSettings');
    component.setSettings(test_data)
    expect(component.MapComponent.setSettings).toHaveBeenCalled();
    expect(component.TimeComponent.setSettings).toHaveBeenCalled();
    expect(WeaponChild1!.setSettings).toHaveBeenCalled();
    expect(WeaponChild2!.setSettings).toHaveBeenCalled();
    expect(WeaponChild3!.setSettings).toHaveBeenCalled();
  });

  it('reset should call children', () => {
    fixture.detectChanges();
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });
    expect(component.WeaponsChildren.length).toBe(3)
    const WeaponChild1: WeaponSelectorComponent = component.WeaponsChildren.get(0)!
    const WeaponChild2: WeaponSelectorComponent = component.WeaponsChildren.get(1)!
    const WeaponChild3: WeaponSelectorComponent = component.WeaponsChildren.get(2)!
    spyOn(component.MapComponent, 'reset');
    spyOn(component.TimeComponent, 'reset');
    spyOn(WeaponChild1, 'reset');
    spyOn(WeaponChild2, 'reset');
    spyOn(WeaponChild3, 'reset');
    component.resetAll()
    expect(component.MapComponent.reset).toHaveBeenCalled();
    expect(component.TimeComponent.reset).toHaveBeenCalled();
    expect(WeaponChild1!.reset).toHaveBeenCalled();
    expect(WeaponChild2!.reset).toHaveBeenCalled();
    expect(WeaponChild3!.reset).toHaveBeenCalled();
  });

  it('query should collect', () => {
    let query: RequestData = component.collectQuery()
    expect(query.performScan).toBe(true)
    expect(query.data.times.end).toBe(175)
    component.PerformScan = false
    component.EndTime = "10"
    query = component.collectQuery()
    expect(query.performScan).toBe(false)
    expect(query.data.times.end).toBe(10)
  });

  it('query is sent and user redirected', () => {
    spyOn<any>(SelectionServiceStub, "setSelection");
    component.sentQuery();
    expect(SelectionServiceStub.setSelection).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(['result']);
  });

  it('redirected to explanation', () => {
    component.goToExplanation();
    expect(router.navigate).toHaveBeenCalledWith(['explanation']);
  });

  it('test events from children', () => {
    fixture.detectChanges();
    spyOn(component, "setCookie")

    expect(component.Map).toBe("de_dust2")
    component.MapComponent.mapEvent.emit("de_mirage");
    expect(component.Map).toBe("de_mirage")
    expect(component.setCookie).toHaveBeenCalledTimes(1)

    expect(component.CTPositions).toEqual([])
    component.MapComponent.ctEvent.emit(["CTSpawn"]);
    expect(component.CTPositions).toEqual(["CTSpawn"])
    expect(component.setCookie).toHaveBeenCalledTimes(2)

    expect(component.TPositions).toEqual([])
    component.MapComponent.tEvent.emit(["CTSpawn"]);
    expect(component.TPositions).toEqual(["CTSpawn"])
    expect(component.setCookie).toHaveBeenCalledTimes(3)

    expect(component.StartTime).toBe("0")
    component.TimeComponent.startEvent.emit("5");
    expect(component.StartTime).toBe("5")
    expect(component.setCookie).toHaveBeenCalledTimes(4)

    expect(component.EndTime).toBe("175")
    component.TimeComponent.endEvent.emit("51");
    expect(component.EndTime).toBe("51")
    expect(component.setCookie).toHaveBeenCalledTimes(5)

    expect(component.PerformScan).toBe(true)
    component.TimeComponent.scanEvent.emit(false)
    expect(component.PerformScan).toBe(false)
    expect(component.setCookie).toHaveBeenCalledTimes(6)
    component.TimeComponent.scanEvent.emit(true)
    expect(component.PerformScan).toBe(true)
    expect(component.setCookie).toHaveBeenCalledTimes(7)

    expect(component.KillAllowed).toEqual([])
    expect(component.KillType).toBe("Classes")
    expect(component.CTAllowed).toEqual([])
    expect(component.CTForbidden).toEqual([])
    expect(component.CTType).toBe("Classes")
    expect(component.TAllowed).toEqual([])
    expect(component.TForbidden).toEqual([])
    expect(component.TType).toBe("Classes")
    component.WeaponsChildren.forEach(c => {
      c.TypeEvent.emit("Weapons");
      if (c.Name == "Kill") {
        c.AllowedEvent.emit(["AK-47"]);
      }
      else if (c.Name == "CT") {
        c.AllowedEvent.emit(["M4A4"]);
        c.ForbiddenEvent.emit(["AWP"])
      }
      else { // c.Name == "T"
        c.AllowedEvent.emit(["M4A1-S"]);
        c.ForbiddenEvent.emit(["FAMAS"])
      }
    });
    expect(component.KillAllowed).toEqual(["AK-47"])
    expect(component.KillType).toBe("Weapons")
    expect(component.CTAllowed).toEqual(["M4A4"])
    expect(component.CTForbidden).toEqual(["AWP"])
    expect(component.CTType).toBe("Weapons")
    expect(component.TAllowed).toEqual(["M4A1-S"])
    expect(component.TForbidden).toEqual(["FAMAS"])
    expect(component.TType).toBe("Weapons")
    expect(component.setCookie).toHaveBeenCalledTimes(15)
  });

});
