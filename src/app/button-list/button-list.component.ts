import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MapsWeaponsService } from '../maps-weapons.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css']
})

export class ButtonListComponent implements OnInit {
  ContentNotSelected: string[] = [];
  ContentSelected: string[] = [];
  contentCtrl = new FormControl();
  filteredContent: Observable<string[]>;
  @Input() ContentType = '';
  @Input() Name = '';
  @Output() contentEvent = new EventEmitter<string[]>();

  constructor(private mapsweaponsService: MapsWeaponsService) {
    this.filteredContent = this.contentCtrl.valueChanges
      .pipe(
        startWith(''),
        map(content => content ? this._filterContent(content) : this.ContentNotSelected.slice())
      );
  }

  ngOnInit(): void {
    this.getContent();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.reset()
  }

  displayNull(_: any) {
    return ''
  }

  getContent(): void {
    this.mapsweaponsService.getList(this.ContentType).subscribe(list => this.ContentNotSelected = list)
  }

  reset() {
    this.getContent()
    this.ContentSelected = []
    this.contentCtrl.setValue('');
    this.submitContent(this.ContentSelected)
  }

  addElement(content: string): void {
    this.ContentSelected.push(content)
    this.ContentNotSelected = this.ContentNotSelected.filter(item => item != content);
    this.submitContent(this.ContentSelected)
    this.contentCtrl.setValue('');
  }
  removeElement(content: string): void {
    this.ContentSelected = this.ContentSelected.filter(item => item != content);
    this.ContentNotSelected.push(content)
    this.submitContent(this.ContentSelected)
    this.contentCtrl.setValue('');
  }

  submitContent(value: string[]) {
    this.contentEvent.emit(value);
  }

  private _filterContent(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.ContentNotSelected.filter(content => content.toLowerCase().indexOf(filterValue) === 0);
  }
}