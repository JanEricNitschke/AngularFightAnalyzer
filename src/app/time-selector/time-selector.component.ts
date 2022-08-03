import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.css']
})
export class TimeSelectorComponent implements OnInit {
  lowerBoundMin: string = '0'
  upperBoundMin: string = '174'
  valueMin: string = '0'
  lowerBoundMax: string = '1'
  upperBoundMax: string = '175'
  valueMax: string = '175'
  performScan: boolean = true
  @Output() startEvent = new EventEmitter<string>();
  @Output() endEvent = new EventEmitter<string>();
  @Output() scanEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  reset() {
    this.lowerBoundMin = '0'
    this.upperBoundMin = '174'
    this.valueMin = '0'
    this.lowerBoundMax = '1'
    this.upperBoundMax = '175'
    this.valueMax = '175'
    this.performScan = true
    this.startEvent.emit(this.valueMin);
    this.endEvent.emit(this.valueMax);
    this.scanEvent.emit(this.performScan)
  }

  adjust_end_min(): void {
    if (this.valueMin <= this.lowerBoundMin) {
      this.valueMin = this.lowerBoundMin
    }
    else if (this.valueMin > this.upperBoundMin) {
      this.valueMin = this.upperBoundMin
    }
    this.lowerBoundMax = (parseInt(this.valueMin) + 1).toString()
    this.startEvent.emit(this.valueMin);
  }

  adjust_start_max(): void {
    if (this.valueMax <= this.lowerBoundMax) {
      this.valueMax = this.lowerBoundMax
    }
    else if (this.valueMax > this.upperBoundMax) {
      this.valueMax = this.upperBoundMax
    }
    this.upperBoundMin = (parseInt(this.valueMax) - 1).toString()
    this.endEvent.emit(this.valueMax);
  }

  submitScan(): void {
    this.scanEvent.emit(this.performScan)
  }

}
