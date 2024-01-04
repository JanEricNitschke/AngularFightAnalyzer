import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RequestData } from "../request-data";
import { TimeSelectorComponent } from "./time-selector.component";

describe("TimeSelectorComponent", () => {
  let component: TimeSelectorComponent;
  let fixture: ComponentFixture<TimeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should adjust_end_min", () => {
    component.valueMin = "-2";
    component.adjust_end_min();
    expect(component.valueMin).toBe(component.lowerBoundMin);
    expect(component.lowerBoundMax).toBe(
      (parseInt(component.valueMin) + 1).toString(),
    );
    component.valueMin = "2123";
    component.adjust_end_min();
    expect(component.valueMin).toBe(component.upperBoundMin);
    expect(component.lowerBoundMax).toBe(
      (parseInt(component.valueMin) + 1).toString(),
    );
  });

  it("should adjust_start_max", () => {
    component.valueMax = "-6";
    component.adjust_start_max();
    expect(component.valueMax).toBe(component.lowerBoundMax);
    expect(component.upperBoundMin).toBe(
      (parseInt(component.valueMax) - 1).toString(),
    );
    component.valueMax = "2123";
    component.adjust_start_max();
    expect(component.valueMax).toBe(component.upperBoundMax);
    expect(component.upperBoundMin).toBe(
      (parseInt(component.valueMax) - 1).toString(),
    );
  });

  it("should reset", () => {
    spyOn(component.endingEvent, "emit");
    spyOn(component.startEvent, "emit");
    spyOn(component.scanEvent, "emit");
    component.valueMin = "16";
    component.lowerBoundMin = "0";
    component.upperBoundMin = "122";
    component.valueMax = "123";
    component.lowerBoundMax = "17";
    component.upperBoundMax = "175";
    component.performScan = false;
    component.reset();
    expect(component.valueMin).toBe("0");
    expect(component.lowerBoundMin).toBe("0");
    expect(component.upperBoundMin).toBe("174");
    expect(component.valueMax).toBe("175");
    expect(component.lowerBoundMax).toBe("1");
    expect(component.upperBoundMax).toBe("175");
    expect(component.performScan).toBe(true);
    expect(component.scanEvent.emit).toHaveBeenCalledWith(true);
    expect(component.startEvent.emit).toHaveBeenCalledWith("0");
    expect(component.endingEvent.emit).toHaveBeenCalledWith("175");
  });

  it("should set settings", () => {
    let test_data: RequestData = {
      data: {
        map_name: "",
        weapons: {
          Kill: [],
          CT: {
            Allowed: [],
            Forbidden: [],
          },
          T: {
            Allowed: [],
            Forbidden: [],
          },
        },
        classes: {
          Kill: [],
          CT: {
            Allowed: [],
            Forbidden: [],
          },
          T: {
            Allowed: [],
            Forbidden: [],
          },
        },
        positions: {
          CT: [],
          T: [],
        },
        use_weapons_classes: {
          CT: "weapons",
          Kill: "weapons",
          T: "weapons",
        },
        times: {
          start: 18,
          end: 162,
        },
      },
      performScan: false,
    };
    spyOn(component.endingEvent, "emit");
    spyOn(component.startEvent, "emit");
    spyOn(component.scanEvent, "emit");
    component.setSettings(test_data);
    expect(component.valueMin).toBe("18");
    expect(component.lowerBoundMin).toBe("0");
    expect(component.upperBoundMin).toBe("161");
    expect(component.valueMax).toBe("162");
    expect(component.lowerBoundMax).toBe("19");
    expect(component.upperBoundMax).toBe("175");
    expect(component.performScan).toBe(false);
    expect(component.scanEvent.emit).toHaveBeenCalledWith(false);
    expect(component.startEvent.emit).toHaveBeenCalledWith("18");
    expect(component.endingEvent.emit).toHaveBeenCalledWith("162");
  });

  it("should submit scan", () => {
    spyOn(component.scanEvent, "emit");
    component.submitScan();
    expect(component.scanEvent.emit).toHaveBeenCalled();
  });
});
