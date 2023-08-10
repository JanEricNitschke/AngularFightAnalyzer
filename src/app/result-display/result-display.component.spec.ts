import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ResultDisplayComponent } from './result-display.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RequestData } from '../request-data';
import { SelectionService } from '../selection.service';
import { Result } from '../result';
import { BehaviorSubject, of } from 'rxjs';

const router = {
  navigate: jasmine.createSpy('navigate'),
};

describe('ResultDisplayComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: ResultDisplayComponent;
  let fixture: ComponentFixture<ResultDisplayComponent>;
  let testResult: Result;
  let testresponseData: any;
  let testUrl = 'https://uq7f1xuyn1.execute-api.eu-central-1.amazonaws.com/dev';

  let testData: any;
  let selection$: BehaviorSubject<RequestData>;
  beforeEach(async () => {
    testData = {
      map_name: 'de_dust2',
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
        CT: 'weapons',
        Kill: 'weapons',
        T: 'weapons',
      },
      times: {
        start: 0,
        end: 10000,
      },
    };
    testResult = {
      Situations_found: 32584,
      CT_win_percentage: [50, 50, 51],
      sql: "SELECT AVG(t.CTWon), COUNT(t.CTWon) FROM ( SELECT DISTINCT e.EventID, e.CTWon FROM Events e JOIN CTWeapons ctw ON e.EventID = ctw.EventID JOIN TWeapons tw ON e.EventID = tw.EventID JOIN WeaponClasses wcct ON ctw.CTWeapon = wcct.WeaponName JOIN WeaponClasses wct ON tw.TWeapon = wct.WeaponName JOIN WeaponClasses wck ON e.KillWeapon = wck.WeaponName WHERE e.MapName = 'de_dust2' AND e.Time BETWEEN 0 AND 10000 ) t",
    };
    testresponseData = { statusCode: 200, body: JSON.stringify(testResult) };
    let SelectionServiceStub: Partial<SelectionService>;
    selection$ = new BehaviorSubject<RequestData>({
      data: {
        map_name: '',
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
          CT: 'weapons',
          Kill: 'weapons',
          T: 'weapons',
        },
        times: {
          start: 0,
          end: 175,
        },
      },
      performScan: true,
    });

    SelectionServiceStub = {
      selectionObservable$: selection$.asObservable(),
    };
    await TestBed.configureTestingModule({
      declarations: [ResultDisplayComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: SelectionService, useValue: SelectionServiceStub },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ResultDisplayComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should go to selector', () => {
    fixture.detectChanges();
    component.GoToSelector();
    expect(router.navigate).toHaveBeenCalledWith(['selector']);
  });

  it('should go to explanation', () => {
    fixture.detectChanges();
    component.GoToExplanation();
    expect(router.navigate).toHaveBeenCalledWith(['explanation']);
  });

  it('should display loading', () => {
    fixture.detectChanges();
    spyOn(component, 'updateTime');
    expect(component.loading).toBe(false);
    const date = new Date();
    component.displayLoading(date);
    expect(component.loading).toBe(true);
    expect(component.updateTime).toHaveBeenCalled();
    component.hideLoading();
    expect(component.loading).toBe(false);
  });

  it('should convert to HMS', () => {
    fixture.detectChanges();
    let time: number = 1001;
    expect(component.msToHMS(time)).toBe('00m:01s');
    time = 196000;
    expect(component.msToHMS(time)).toBe('03m:16s');
  });

  it('should update time', () => {
    fixture.detectChanges();
    const date = new Date();
    expect(component.loading).toBe(false);
    expect(component.timerInnerHTML).toBe('');
    component.updateTime(date);
    expect(component.timerInnerHTML).toBe('');
    component.loading = true;
    component.updateTime(date);
    expect(component.timerInnerHTML).not.toBe('');
  });

  it('should call api', () => {
    fixture.detectChanges();
    let actual: any;
    component
      .call_API(testUrl, testData)
      .subscribe((value) => (actual = value));

    // Simulating a request.
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);
    req.flush(testresponseData);
    // Asserting the result.
    expect(actual).toEqual(testresponseData);
  });

  it('should init empty', waitForAsync(() => {
    expect(component.ResponseStatusCode).toBe(0);
    const emptyResponse: Result = {
      Situations_found: 0,
      CT_win_percentage: [0, 0, 0],
      sql: '',
    };
    expect(component.ResponseBody).toEqual(emptyResponse);
    spyOn(component, 'scanLowerRange');
    spyOn(component, 'scanUpperRange');
    spyOn(component, 'call_API');
    spyOn(component, 'displayLoading');
    spyOn(component, 'hideLoading');

    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ResponseStatusCode).toBe(-17);
      expect(component.scanLowerRange).not.toHaveBeenCalled();
      expect(component.scanUpperRange).not.toHaveBeenCalled();
      expect(component.call_API).not.toHaveBeenCalled();
      expect(component.displayLoading).not.toHaveBeenCalled();
      expect(component.hideLoading).not.toHaveBeenCalled();
      expect(component.showCanvas).toBe(false);
    });
  }));

  it('should init successful solo', waitForAsync(() => {
    expect(component.ResponseStatusCode).toBe(0);
    let myselection = { data: testData, performScan: false };
    selection$.next(myselection);
    spyOn(component, 'scanLowerRange');
    spyOn(component, 'scanUpperRange');
    spyOn(component, 'call_API').and.returnValue(of(testresponseData));
    spyOn(component, 'displayLoading');
    spyOn(component, 'hideLoading');

    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.ResponseStatusCode).toBe(testresponseData.statusCode);
      expect(component.scanLowerRange).not.toHaveBeenCalled();
      expect(component.scanUpperRange).not.toHaveBeenCalled();
      expect(component.call_API).toHaveBeenCalledWith(testUrl, testData);
      expect(component.displayLoading).toHaveBeenCalled();
      expect(component.hideLoading).toHaveBeenCalled();
      expect(component.showCanvas).toBe(false);
    });
  }));

  it('should init successful scan upper', waitForAsync(() => {
    expect(component.ResponseStatusCode).toBe(0);
    let myselection = { data: testData, performScan: true };
    selection$.next(myselection);
    spyOn(component, 'scanLowerRange');
    spyOn(component, 'scanUpperRange');
    spyOn(component, 'call_API');
    spyOn(component, 'displayLoading');
    spyOn(component, 'hideLoading');

    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.scanLowerRange).not.toHaveBeenCalled();
      expect(component.scanUpperRange).toHaveBeenCalledWith(0, 175, testData);
      expect(component.call_API).not.toHaveBeenCalled();
      expect(component.displayLoading).toHaveBeenCalled();
      expect(component.showCanvas).toBe(true);
    });
  }));

  it('should init successful scan lower', waitForAsync(() => {
    expect(component.ResponseStatusCode).toBe(0);
    testData.times.start = 10;
    let myselection = { data: testData, performScan: true };
    selection$.next(myselection);
    spyOn(component, 'scanLowerRange');
    spyOn(component, 'scanUpperRange');
    spyOn(component, 'call_API');
    spyOn(component, 'displayLoading');
    spyOn(component, 'hideLoading');

    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.scanLowerRange).toHaveBeenCalledWith(10, 175, testData);
      expect(component.scanUpperRange).not.toHaveBeenCalled();
      expect(component.call_API).not.toHaveBeenCalled();
      expect(component.displayLoading).toHaveBeenCalled();
      expect(component.showCanvas).toBe(true);
    });
  }));

  it('should scan upper range', waitForAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'hideLoading');
    spyOn<any>(component, 'updateChart');
    expect(component.ResponseStatusCode).not.toBe(testresponseData.statusCode);
    expect(component.chartOptions.plugins!.title!.text).toBe('Time range scan');
    expect(component.plotData.length).toBe(0);
    component.scanUpperRange(0, 101, testData);

    const expectedLength = 18;
    let requests = httpTestingController.match(testUrl);
    expect(requests.length).toBe(expectedLength);
    for (let thisRequest of requests) {
      expect(thisRequest.request.method).toBe('POST');
      thisRequest.flush(testresponseData);
    }

    fixture.whenStable().then(() => {
      expect(component.chartOptions.plugins!.title!.text).toBe(
        'Scan over upper value of time range',
      );
      expect(component.hideLoading).toHaveBeenCalledOnceWith();
      expect(component['updateChart']).toHaveBeenCalledOnceWith();
      expect(component.ResponseStatusCode).toBe(200);
      expect(component.plotData.length).toBe(expectedLength);
    });
  }));

  it('should scan lower range', waitForAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'hideLoading');
    spyOn<any>(component, 'updateChart');
    expect(component.ResponseStatusCode).not.toBe(testresponseData.statusCode);
    expect(component.chartOptions.plugins!.title!.text).toBe('Time range scan');
    expect(component.plotData.length).toBe(0);
    component.scanLowerRange(18, 175, testData);

    const expectedLength = 17;
    let requests = httpTestingController.match(testUrl);
    expect(requests.length).toBe(expectedLength);
    for (let thisRequest of requests) {
      expect(thisRequest.request.method).toBe('POST');
      thisRequest.flush(testresponseData);
    }

    fixture.whenStable().then(() => {
      expect(component.chartOptions.plugins!.title!.text).toBe(
        'Scan over lower value of time range',
      );
      expect(component.hideLoading).toHaveBeenCalledOnceWith();
      expect(component['updateChart']).toHaveBeenCalledOnceWith();
      expect(component.ResponseStatusCode).toBe(200);
      expect(component.plotData.length).toBe(expectedLength);
    });
  }));
});
