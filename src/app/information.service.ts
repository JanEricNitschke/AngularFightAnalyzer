import { Injectable } from '@angular/core';
import { informationmap } from './information-contents';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor() { }

  getInformation(identifier: string): Observable<string> {
    const information = of(informationmap.get(identifier)!);
    return information;
  }
}
