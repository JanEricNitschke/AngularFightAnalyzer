import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RequestData } from "../request-data";

@Component({
  selector: "app-time-selector",
  templateUrl: "./time-selector.component.html",
  styleUrls: ["./time-selector.component.css"],
})
export class TimeSelectorComponent {
  lowerBoundMin: string = "0";
  upperBoundMin: string = "174";
  valueMin: string = "0";
  lowerBoundMax: string = "1";
  upperBoundMax: string = "175";
  valueMax: string = "175";
  performScan: boolean = true;
  @Output() startEvent = new EventEmitter<string>();
  @Output() endingEvent = new EventEmitter<string>();
  @Output() scanEvent = new EventEmitter<boolean>();

  constructor() {}

  adjust_end_min(): void {
    if (parseInt(this.valueMin) <= parseInt(this.lowerBoundMin)) {
      this.valueMin = this.lowerBoundMin;
    } else if (parseInt(this.valueMin) > parseInt(this.upperBoundMin)) {
      this.valueMin = this.upperBoundMin;
    }
    this.lowerBoundMax = (parseInt(this.valueMin) + 1).toString();
    this.startEvent.emit(this.valueMin);
  }

  adjust_start_max(): void {
    if (parseInt(this.valueMax) <= parseInt(this.lowerBoundMax)) {
      this.valueMax = this.lowerBoundMax;
    } else if (parseInt(this.valueMax) > parseInt(this.upperBoundMax)) {
      this.valueMax = this.upperBoundMax;
    }
    this.upperBoundMin = (parseInt(this.valueMax) - 1).toString();
    this.endingEvent.emit(this.valueMax);
  }

  reset() {
    this.valueMin = "0";
    this.lowerBoundMin = this.valueMin;
    this.lowerBoundMax = (parseInt(this.valueMin) + 1).toString();
    this.valueMax = "175";
    this.upperBoundMax = this.valueMax;
    this.upperBoundMin = (parseInt(this.valueMax) - 1).toString();
    this.performScan = true;
    this.startEvent.emit(this.valueMin);
    this.endingEvent.emit(this.valueMax);
    this.scanEvent.emit(this.performScan);
  }

  setSettings(settings_data: RequestData) {
    this.valueMin = settings_data.data.times.start.toString();
    this.valueMax = settings_data.data.times.end.toString();
    this.lowerBoundMax = (parseInt(this.valueMin) + 1).toString();
    this.upperBoundMin = (parseInt(this.valueMax) - 1).toString();
    this.lowerBoundMin = "0";
    this.upperBoundMax = "175";
    this.performScan = settings_data.performScan;
    this.startEvent.emit(this.valueMin);
    this.endingEvent.emit(this.valueMax);
    this.scanEvent.emit(this.performScan);
  }

  submitScan(): void {
    this.scanEvent.emit(this.performScan);
  }
}
