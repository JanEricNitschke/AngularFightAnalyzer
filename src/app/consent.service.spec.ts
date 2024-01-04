import { TestBed } from "@angular/core/testing";

import { ConsentService } from "./consent.service";

describe("ConsentService", () => {
  let service: ConsentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsentService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("consent should be false", () => {
    expect(service.consentGiven).toBe(false);
  });
  it("cookie name should be SelectorSettings", () => {
    expect(service.cookie_name).toBe("SelectorSettings");
  });
  it("settings should be modified", () => {
    service.consentGiven = true;
    service.cookie_name = "test";
    expect(service.consentGiven).toBe(true);
    expect(service.cookie_name).toBe("test");
  });
});
