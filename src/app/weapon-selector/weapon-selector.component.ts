import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-weapon-selector',
  templateUrl: './weapon-selector.component.html',
  styleUrls: ['./weapon-selector.component.css']
})
export class WeaponSelectorComponent implements OnInit {

  constructor() { }
  @Input() Name = ""
  @Input() only_allowed = false
  Type: string = "Classes"
  Choices: string[] = ["Classes", "Weapons"]
  Allowed: string[] = [];
  Forbidden: string[] = [];
  @Output() AllowedEvent = new EventEmitter<string[]>();
  @Output() ForbiddenEvent = new EventEmitter<string[]>();
  @Output() TypeEvent = new EventEmitter<string>();
  ngOnInit(): void {
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
