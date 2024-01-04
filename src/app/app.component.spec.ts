import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { ConsentService } from "./consent.service";
import {
  NgcCookieConsentService,
  NgcStatusChangeEvent,
} from "ngx-cookieconsent";
import { of, Subject } from "rxjs";

@Component({
  selector: "app-router-outlet",
  template: "",
})
class MockRouterOutletComponent {}

describe("AppComponent", () => {
  let ConsentServiceStub: Partial<ConsentService>;

  ConsentServiceStub = {
    consentGiven: false,
    cookie_name: "SelectorSettings",
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
      declarations: [AppComponent, MockRouterOutletComponent],
      providers: [
        { provide: ConsentService, useValue: ConsentServiceStub },
        {
          provide: NgcCookieConsentService,
          useValue: NgcCookieConsentServiceStub,
        },
      ],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should react to event", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    expect(ConsentServiceStub.consentGiven).toBe(false);
    statusChangeSource.next({ status: "allow", chosenBefore: false });
    fixture.detectChanges();
    expect(ConsentServiceStub.consentGiven).toBe(true);
    fixture.detectChanges();
    statusChangeSource.next({ status: "dismiss", chosenBefore: false });
    expect(ConsentServiceStub.consentGiven).toBe(false);
  });

  it(`should have as title 'CS:GO FightAnalyzer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title).toEqual("CS:GO FightAnalyzer");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain(
      "CS:GO FightAnalyzer",
    );
  });
});
