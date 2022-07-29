import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SelectionService } from '../selection.service';
import { Result } from "../result"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParseTreeResult } from '@angular/compiler';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent implements OnInit {
  ResponseBody: Result = {
    Situations_found: 0,
    CT_win_percentage: 0,
    sql: ''
  };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  loadingDisplay: string = 'display: none'
  timerDisplay: string = 'display: none'
  timerInnerHTML: string = ''
  resultInnerHTML: string = "The result will be shown here.<br>Press the 'Query' button to get the CT winpercentage for your chosen configuration.";
  ResponseStatusCode: number = 0;
  constructor(private http: HttpClient, private router: Router, private selectionService: SelectionService) { }

  selection: any;

  ngOnInit(): void {
    this.selectionService.selectionObservable$.subscribe((value) => {
      this.selection = value;
      const date = new Date();
      this.displayLoading(date)
      this.call_API("https://uq7f1xuyn1.execute-api.eu-central-1.amazonaws.com/dev", value).subscribe(data => {
        this.ResponseBody = JSON.parse(data.body);
        this.ResponseStatusCode = data.statusCode;
        this.hideLoading()
        this.ParseResult()
      })
    });
  }


  ParseResult() {
    try {
      const body = this.ResponseBody
      const status_code = this.ResponseStatusCode
      if (status_code == 200) {
        this.resultInnerHTML = "A total of " + body.Situations_found + " situations matching your description  \
            have been found.<br>Out of those the CT's won " + body.CT_win_percentage + "%."
      }
      else if (status_code == 500) {
        this.resultInnerHTML = "An error occured while processing your request: " + body.errorMessage
      }
      else if (status_code == 408) {
        this.resultInnerHTML = "The request timed out with the error message: " + body.errorMessage + "!<br>Your selection is probably too broad. Try a narrower one!"
      }
      else {
        this.resultInnerHTML = "An unkown status_code of " + status_code + " was returned from your query. I do not know what happend here..."
      }
    }
    catch {
      this.resultInnerHTML = "Got an invalid response. It is likely that the gateway timed out.<br>Your selection is probably too broad. Try a narrower one!"
    }
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


  call_API(url: string, raw: string) {
    return this.http.post<any>(url, raw, this.httpOptions)
  }
}