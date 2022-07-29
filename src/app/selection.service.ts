import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selection$ = new BehaviorSubject<any>({});
  selectionObservable$ = this.selection$.asObservable();
  constructor() { }

  setSelection(selection: any) {
    this.selection$.next(selection);
  }
}
