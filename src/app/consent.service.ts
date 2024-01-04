import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConsentService {
  consentGiven = false;
  cookie_name = "SelectorSettings";
  constructor() {}
}
