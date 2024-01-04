import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RequestData } from "./request-data";

@Injectable({
  providedIn: "root",
})
export class SelectionService {
  private selection$ = new BehaviorSubject<RequestData>({
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
        start: 0,
        end: 175,
      },
    },
    performScan: true,
  });
  selectionObservable$ = this.selection$.asObservable();
  constructor() {}

  setSelection(selection: RequestData) {
    this.selection$.next(selection);
  }
}
