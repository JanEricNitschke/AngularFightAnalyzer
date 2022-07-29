import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { WeaponSelectorComponent } from '../weapon-selector/weapon-selector.component';
import { MapsWeaponsService } from '../maps-weapons.service';
@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css']
})
export class ButtonListComponent implements OnInit {
  ContentNotSelected: string[] = [];
  ContentSelected: string[] = [];
  @Input() Name = '';
  @Input() ContentType = '';
  @Input() Alignment = "Vertical"
  @Output() contentEvent = new EventEmitter<string[]>();
  constructor(private mapsweaponsService: MapsWeaponsService) { }

  ngOnInit(): void {
    this.getContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getContent()
    this.ContentSelected = []
    this.submitContent(this.ContentSelected)
  }

  getContent(): void {
    this.mapsweaponsService.getList(this.ContentType).subscribe(list => this.ContentNotSelected = list)
  }

  addElement(content: string): void {
    this.ContentSelected.push(content)
    this.ContentNotSelected = this.ContentNotSelected.filter(item => item != content);
    this.submitContent(this.ContentSelected)
  }
  removeElement(content: string): void {
    this.ContentSelected = this.ContentSelected.filter(item => item != content);
    this.ContentNotSelected.push(content)
    this.submitContent(this.ContentSelected)
  }

  submitContent(value: string[]) {
    this.contentEvent.emit(value);
  }
}