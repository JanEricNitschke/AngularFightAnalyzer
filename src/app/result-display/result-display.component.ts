import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionService } from '../selection.service';
import { Result } from '../result';
import { RequestContent } from '../request-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, forkJoin } from 'rxjs';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css'],
})
export class ResultDisplayComponent implements OnInit, OnDestroy {
  ResponseBody: Result = {
    Situations_found: 0,
    CT_win_percentage: [0, 0, 0],
    sql: '',
  };
  UserSelection: RequestContent | undefined = undefined;
  loading: boolean = false;
  timerInnerHTML: string = '';
  ResponseStatusCode: number = 0;
  Request: any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  _selectionServiceSubscription: Subscription;

  plotData: number[] = [];
  plotLower: number[] = [];
  plotUpper: number[] = [];
  plotLabels: number[] = [];
  step: number = 10;
  maximum: number = 175;
  minimum: number = 0;
  showCanvas: boolean = false;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  chartData: ChartDataset[] = [
    {
      label: 'CT win percentage',
      data: this.plotData,

      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 10, // grows the point when hovered

      pointRadius: 5,
      borderColor: '#FF9900', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
      pointBackgroundColor: '#FF9900',
      pointHoverBackgroundColor: '#FF9900',
      borderWidth: 3, // main line width
      hoverBorderWidth: 0, // borders on points
      pointBorderWidth: 0, // removes POINT borders
      tension: 0.3, // makes line more squiggly
    },
    {
      label: 'Lower error',
      data: this.plotLower,
      pointHitRadius: 0,
      pointRadius: 0,
      borderWidth: 1,
      borderColor: '#ffd699',
      tension: 0.3, // makes line more squiggly
    },
    {
      borderColor: '#ffd699',
      label: 'Upper error',
      data: this.plotUpper,
      pointRadius: 0,
      borderWidth: 1,
      pointHitRadius: 0,
      tension: 0.3, // makes line more squiggly
    },
  ];
  chartLabels: number[] = this.plotLabels;
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      xAxis: {
        title: {
          text: 'Scanned value',
          display: true,
          color: '#FF9900',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'CT win percentage',
          display: true,
          color: '#FF9900',
        },
      },
    },

    plugins: {
      title: {
        text: 'Time range scan',
        color: '#FF9900',
        display: true,
        font: {
          size: 20,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        filter: (tooltipItem) => tooltipItem.datasetIndex == 0,
        // ⤵️ tooltip main styles
        backgroundColor: 'white',
        displayColors: false,
        padding: 10,

        // ⤵️ title
        titleColor: '#FF9900',
        titleFont: {
          size: 18,
        },

        // ⤵️ body
        bodyColor: '#FF9900',
        bodyFont: {
          size: 13,
        },
      },
    },
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private selectionService: SelectionService,
  ) {}

  ngOnInit(): void {
    this._selectionServiceSubscription =
      this.selectionService.selectionObservable$.subscribe((value) => {
        let data = value.data;
        this.UserSelection = data;
        if (data.map_name == '') {
          this.ResponseStatusCode = -17;
          return;
        }
        const date = new Date();
        this.displayLoading(date);
        this.Request = JSON.parse(JSON.stringify(data));
        if (value.performScan) {
          this.showCanvas = true;
          const lower = data.times.start;
          const upper = data.times.end < 175 ? data.times.end : 175;
          if (lower > 175 - upper) {
            this.scanLowerRange(lower, upper, data);
          } else {
            this.scanUpperRange(lower, upper, data);
          }
        } else {
          this.call_API(
            'https://uq7f1xuyn1.execute-api.eu-central-1.amazonaws.com/dev',
            data,
          ).subscribe((data) => {
            this.ResponseBody = JSON.parse(data.body);
            this.ResponseStatusCode = data.statusCode;
            this.hideLoading();
          });
        }
      });
  }

  ngOnDestroy() {
    this._selectionServiceSubscription.unsubscribe();
  }

  async scanUpperRange(lower: number, upper: number, data: RequestContent) {
    const callArray = [];
    const start = lower + 1 + ((upper - 1 - lower) % this.step);
    this.chartOptions.plugins!.title!.text =
      'Scan over upper value of time range'; //"Lower data of time range"
    for (let i = start; i < this.maximum + 1; i += this.step) {
      if (i + this.step > this.maximum) {
        data.times.end = 10000;
      } else {
        data.times.end = i;
      }
      callArray.push(
        this.http.post<any>(
          'https://uq7f1xuyn1.execute-api.eu-central-1.amazonaws.com/dev',
          JSON.parse(JSON.stringify(data)),
          this.httpOptions,
        ),
      );
    }
    forkJoin(callArray).subscribe((responses) => {
      const offset = start - (start % this.step);
      for (let i = start; i < this.maximum + 1; i += this.step) {
        const index = (i - offset - (upper % this.step)) / this.step;
        const body = JSON.parse(responses[index].body);
        this.plotData[index] = body.CT_win_percentage[1];
        this.plotLower[index] = body.CT_win_percentage[0];
        this.plotUpper[index] = body.CT_win_percentage[2];
        this.plotLabels[index] = i;
        if (i == upper) {
          this.ResponseBody = body;
          this.ResponseStatusCode = responses[index].statusCode;
        }
      }
      this.hideLoading();
      this.updateChart();
    });
  }

  async scanLowerRange(lower: number, upper: number, data: RequestContent) {
    const callArray = [];
    const start = this.minimum + ((lower - this.minimum) % this.step);
    this.chartOptions.plugins!.title!.text =
      'Scan over lower value of time range'; //"Lower data of time range"
    for (let i = start; i < upper; i += this.step) {
      data.times.start = i;
      callArray.push(
        this.http.post<any>(
          'https://uq7f1xuyn1.execute-api.eu-central-1.amazonaws.com/dev',
          JSON.parse(JSON.stringify(data)),
          this.httpOptions,
        ),
      );
    }
    forkJoin(callArray).subscribe((responses) => {
      const offset = start - (start % this.step);
      for (let i = start; i < upper; i += this.step) {
        const index = (i - offset - (lower % this.step)) / this.step;
        const body = JSON.parse(responses[index].body);
        this.plotData[index] = body.CT_win_percentage[1];
        this.plotLower[index] = body.CT_win_percentage[0];
        this.plotUpper[index] = body.CT_win_percentage[2];
        this.plotLabels[index] = i;
        if (i == lower) {
          this.ResponseBody = body;
          this.ResponseStatusCode = responses[index].statusCode;
        }
      }
      this.hideLoading();
      this.updateChart();
    });
  }

  private updateChart() {
    this.chart.ngOnChanges({});
  }

  displayLoading(date: Date) {
    this.loading = true;
    this.updateTime(date);
  }

  updateTime(oldDate: Date) {
    if (this.loading) {
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
    const minutesStr = ('00' + minutes).slice(-2);
    const secondsStr = ('00' + seconds).slice(-2);
    return minutesStr + 'm:' + secondsStr + 's';
  }

  // hiding loading
  hideLoading() {
    this.loading = false;
  }

  GoToSelector() {
    this.router.navigate(['selector']);
  }

  GoToExplanation() {
    this.router.navigate(['explanation']);
  }

  call_API(url: string, raw: any) {
    return this.http.post<any>(url, raw, this.httpOptions);
  }
}
