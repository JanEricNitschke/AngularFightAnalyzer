import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { ButtonListComponent } from '../button-list/button-list.component';
import { RequestData } from '../request-data';

@Component({
  selector: 'app-weapon-selector',
  templateUrl: './weapon-selector.component.html',
  styleUrls: ['./weapon-selector.component.css']
})

export class WeaponSelectorComponent implements OnInit {

  Type: string = "Classes"
  Choices: string[] = ["Classes", "Weapons"]
  Allowed: string[] = [];
  Forbidden: string[] = [];
  @Input() Name: string = ""
  @Input() only_allowed = false
  @Output() AllowedEvent = new EventEmitter<string[]>();
  @Output() ForbiddenEvent = new EventEmitter<string[]>();
  @Output() TypeEvent = new EventEmitter<string>();

  @ViewChildren(ButtonListComponent)
  Children: QueryList<ButtonListComponent>

  constructor() { }

  ngOnInit(): void {
  }

  setSettings(settings_data: RequestData) {
    const thisType = (settings_data.data.use_weapons_classes as any)[this.Name];
    this.Type = thisType.charAt(0).toUpperCase() + thisType.slice(1);
    this.TypeEvent.emit(this.Type);
    setTimeout(() => this.Children.forEach(c => this.only_allowed ? c.setSettings((settings_data.data as any)[this.Type.toLowerCase()][this.Name]) : c.setSettings((settings_data.data as any)[this.Type.toLowerCase()][this.Name][c.Name])));
  }

  reset() {
    this.Children.forEach(c => c.reset()); // or whatever you want to do to it here
    this.Type = "Classes";
    this.TypeEvent.emit(this.Type);
  }

  updateAllowed(allowed: string[]) {
    this.Allowed = allowed;
    this.AllowedEvent.emit(this.Allowed);
  }

  updateForbidden(forbidden: string[]) {
    this.Forbidden = forbidden;
    this.ForbiddenEvent.emit(this.Forbidden);
  }

  submitType() {
    this.TypeEvent.emit(this.Type)
    this.AllowedEvent.emit(this.Allowed);
    this.ForbiddenEvent.emit(this.Forbidden);
  }

}
