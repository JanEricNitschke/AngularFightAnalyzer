import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  QueryList,
  AfterViewInit,
  inject,
} from "@angular/core";
import { Router } from "@angular/router";
import { MapSelectorComponent } from "../map-selector/map-selector.component";
import { SelectionService } from "../selection.service";
import { ConsentService } from "../consent.service";
import { TimeSelectorComponent } from "../time-selector/time-selector.component";
import { WeaponSelectorComponent } from "../weapon-selector/weapon-selector.component";
import { CookieService } from "ngx-cookie-service";
import { RequestData } from "../request-data";

@Component({
  selector: "app-fight-selector",
  templateUrl: "./fight-selector.component.html",
  styleUrls: ["./fight-selector.component.css"],
  standalone: false,
})
export class FightSelectorComponent implements OnInit, AfterViewInit {
  private router = inject(Router);
  private selectionService = inject(SelectionService);
  private cookieService = inject(CookieService);
  private consentService = inject(ConsentService);

  cookie_name: string = "";
  Map: string = "de_dust2";
  CTPositions: string[] = [];
  TPositions: string[] = [];
  KillAllowed: string[] = [];
  KillType: string = "Classes";
  CTAllowed: string[] = [];
  CTForbidden: string[] = [];
  CTType: string = "Classes";
  TAllowed: string[] = [];
  TForbidden: string[] = [];
  TType: string = "Classes";
  StartTime: string = "0";
  EndTime: string = "175";
  PerformScan: boolean = true;

  @ViewChildren(WeaponSelectorComponent)
  WeaponsChildren: QueryList<WeaponSelectorComponent>;
  @ViewChild(MapSelectorComponent)
  MapComponent!: MapSelectorComponent;
  @ViewChild(TimeSelectorComponent)
  TimeComponent!: TimeSelectorComponent;

  ngOnInit(): void {
    this.cookie_name = this.consentService.cookie_name;
  }

  ngAfterViewInit(): void {
    if (this.consentService.consentGiven) {
      this.getCookie();
    }
  }

  isRequestData(obj: any): obj is RequestData {
    return obj.performScan !== undefined && obj.data !== undefined;
  }

  setSettings(settings_data: RequestData) {
    this.WeaponsChildren.forEach((c) => c.setSettings(settings_data));
    this.MapComponent.setSettings(settings_data);
    this.TimeComponent.setSettings(settings_data);
  }

  setCookie() {
    if (this.consentService.consentGiven) {
      const settings_data = this.collectQuery();
      this.cookieService.set(this.cookie_name, JSON.stringify(settings_data), {
        expires: 365,
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
    }
  }

  getCookie() {
    if (this.cookieService.check(this.cookie_name)) {
      const value = this.cookieService.get(this.cookie_name);
      const settings_data: RequestData = JSON.parse(value);
      if (this.isRequestData(settings_data)) {
        this.setSettings(settings_data);
      }
    }
  }

  deleteCookie() {
    this.cookieService.delete(this.cookie_name);
  }

  resetAll() {
    if (confirm("Are you sure you want to reset your current selection?")) {
      this.WeaponsChildren.forEach((c) => c.reset());
      this.MapComponent.reset();
      this.TimeComponent.reset();
    }
  }

  collectQuery(): RequestData {
    return {
      data: {
        map_name: this.Map,
        weapons: {
          Kill: this.KillType == "Weapons" ? this.KillAllowed : [],
          T:
            this.TType == "Weapons"
              ? { Allowed: this.TAllowed, Forbidden: this.TForbidden }
              : { Allowed: [], Forbidden: [] },
          CT:
            this.CTType == "Weapons"
              ? { Allowed: this.CTAllowed, Forbidden: this.CTForbidden }
              : { Allowed: [], Forbidden: [] },
        },
        classes: {
          Kill: this.KillType == "Classes" ? this.KillAllowed : [],
          T:
            this.TType == "Classes"
              ? { Allowed: this.TAllowed, Forbidden: this.TForbidden }
              : { Allowed: [], Forbidden: [] },
          CT:
            this.CTType == "Classes"
              ? { Allowed: this.CTAllowed, Forbidden: this.CTForbidden }
              : { Allowed: [], Forbidden: [] },
        },
        positions: { CT: this.CTPositions, T: this.TPositions },
        use_weapons_classes: {
          CT: this.CTType.toLowerCase(),
          T: this.TType.toLowerCase(),
          Kill: this.KillType.toLowerCase(),
        },
        times: { start: parseInt(this.StartTime), end: parseInt(this.EndTime) },
      },
      performScan: this.PerformScan,
    };
  }

  sentQuery() {
    const event_data: RequestData = this.collectQuery();
    event_data.data.times.end =
      event_data.data.times.end == 175 ? 10000 : event_data.data.times.end;
    this.selectionService.setSelection(event_data);
    this.router.navigate(["result"]);
  }

  goToExplanation() {
    this.router.navigate(["explanation"]);
  }

  updateStartTime(start_time: string) {
    this.StartTime = start_time;
    this.setCookie();
  }

  updateEndTime(end_time: string) {
    this.EndTime = end_time;
    this.setCookie();
  }
  updateScanSetting(perform: boolean) {
    this.PerformScan = perform;
    this.setCookie();
  }

  updateCTPositions(ct_positions: string[]) {
    this.CTPositions = ct_positions;
    this.setCookie();
  }

  updateTPositions(t_positions: string[]) {
    this.TPositions = t_positions;
    this.setCookie();
  }

  updateMap(map: string) {
    this.Map = map;
    this.setCookie();
  }

  updateCTAllowed(allowed: string[]) {
    this.CTAllowed = allowed;
    this.setCookie();
  }

  updateCTForbidden(forbidden: string[]) {
    this.CTForbidden = forbidden;
    this.setCookie();
  }

  updateCTType(type: string) {
    this.CTType = type;
    this.setCookie();
  }

  updateTAllowed(allowed: string[]) {
    this.TAllowed = allowed;
    this.setCookie();
  }

  updateTForbidden(forbidden: string[]) {
    this.TForbidden = forbidden;
    this.setCookie();
  }

  updateTType(type: string) {
    this.TType = type;
    this.setCookie();
  }

  updateKillAllowed(allowed: string[]) {
    this.KillAllowed = allowed;
    this.setCookie();
  }

  updateKillType(type: string) {
    this.KillType = type;
    this.setCookie();
  }
}
