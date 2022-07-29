import { Injectable } from '@angular/core';
import { contentsmap } from './button-list-contents';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsWeaponsService {

  constructor() { }

  getList(identifier: string): Observable<string[]> {
    const list = of(contentsmap.get(identifier)!);
    return list;
  }
}
