import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionService } from '../selection.service';
import { Result } from "../result"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent implements OnInit, OnDestroy {
  ResponseBody: Result = {
    Situations_found: 0,
    CT_win_percentage: [0, 0, 0],
    sql: ''
  };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  loadingDisplay: string = 'display: none'
  timerDisplay: string = 'display: none'
  timerInnerHTML: string = ''
  ResponseStatusCode: number = 0;

  constructor(private http: HttpClient, private router: Router, private selectionService: SelectionService) { }
  _selectionServiceSubscription: Subscription;
  selection: any;

  ngOnInit(): void {
    this._selectionServiceSubscription = this.selectionService.selectionObservable$.subscribe((value) => {
      const date = new Date();
      this.displayLoading(date)
      this.call_API("https://uq7f1xuyn1.execute-api.eu-central-1.amazonaws.com/dev", value).subscribe(data => {
        this.ResponseBody = JSON.parse(data.body);
        this.ResponseStatusCode = data.statusCode;
        this.hideLoading()
      })
    });
  }

  ngOnDestroy() {
    this._selectionServiceSubscription.unsubscribe()
  }

  displayLoading(date: Date) {
    this.loadingDisplay = 'display: inline-block'
    this.timerDisplay = 'display: inline'
    this.updateTime(date)
  }

  updateTime(oldDate: Date) {
    if (this.timerDisplay != 'display: none') {
      const newDate = new Date();
      setTimeout(this.updateTime.bind(this), 1000, oldDate);
      this.timerInnerHTML = this.msToHMS(newDate.getTime() - oldDate.getTime());
    }
  }

  msToHMS(ms: number): string {
    // 1- Convert to seconds:
    let seconds = ms / 1000;

    // 3- Extract minutes:
    const minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute

    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.floor(seconds % 60);

    // 5 - Format so it shows a leading zero if needed
    const minutesStr = ("00" + minutes).slice(-2);
    const secondsStr = ("00" + seconds).slice(-2);
    return minutesStr + "m:" + secondsStr + "s"
  }

  // hiding loading
  hideLoading() {
    this.loadingDisplay = 'display: none'
    this.timerDisplay = 'display: none'
  }

  GoToSelector() {
    this.router.navigate(['selector']);
  }

  GoToExplanation() {
    this.router.navigate(['explanation']);
  }


  call_API(url: string, raw: string) {
    return this.http.post<any>(url, raw, this.httpOptions)
  }
}