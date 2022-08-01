import { Component, OnInit, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { MapSelectorComponent } from '../map-selector/map-selector.component';
import { SelectionService } from '../selection.service';
import { TimeSelectorComponent } from '../time-selector/time-selector.component';
import { WeaponSelectorComponent } from '../weapon-selector/weapon-selector.component';

@Component({
  selector: 'app-fight-selector',
  templateUrl: './fight-selector.component.html',
  styleUrls: ['./fight-selector.component.css']
})
export class FightSelectorComponent implements OnInit {

  Map: string = 'de_dust2'
  CTPositions: string[] = [];
  TPositions: string[] = [];
  KillAllowed: string[] = [];
  KillType: string = 'Classes'
  CTAllowed: string[] = [];
  CTForbidden: string[] = [];
  CTType: string = 'Classes'
  TAllowed: string[] = [];
  TForbidden: string[] = [];
  TType: string = 'Classes';
  StartTime: string = '0';
  EndTime: string = '175';

  @ViewChildren(WeaponSelectorComponent)
  WeaponsChildren: QueryList<WeaponSelectorComponent>
  @ViewChild(MapSelectorComponent)
  MapComponent!: MapSelectorComponent;
  @ViewChild(TimeSelectorComponent)
  TimeComponent!: TimeSelectorComponent;



  constructor(private router: Router, private selectionService: SelectionService) { }

  ngOnInit(): void {
  }

  resetAll() {
    if (confirm("Are you sure you want to reset your current selection?")) {
      this.WeaponsChildren.forEach(c => c.reset());
      this.MapComponent.reset()
      this.TimeComponent.reset()
    }
  }

  CollectQuery() {
    const event_data = {
      "map_name": this.Map,
      "weapons": {
        "Kill": this.KillType == "Weapons" ? this.KillAllowed : [], "T": this.TType == "Weapons" ? { "Allowed": this.TAllowed, "Forbidden": this.TForbidden } : { "Allowed": [], "Forbidden": [] },
        "CT": this.CTType == "Weapons" ? { "Allowed": this.CTAllowed, "Forbidden": this.CTForbidden } : { "Allowed": [], "Forbidden": [] }
      },
      "classes": {
        "Kill": this.KillType == "Classes" ? this.KillAllowed : [], "T": this.TType == "Classes" ? { "Allowed": this.TAllowed, "Forbidden": this.TForbidden } : { "Allowed": [], "Forbidden": [] },
        "CT": this.CTType == "Classes" ? { "Allowed": this.CTAllowed, "Forbidden": this.CTForbidden } : { "Allowed": [], "Forbidden": [] }
      },
      "positions": { "CT": this.CTPositions, "T": this.TPositions },
      "use_weapons_classes": { "CT": this.CTType.toLowerCase(), "T": this.TType.toLowerCase(), "Kill": this.KillType.toLowerCase() },
      "times": { "start": this.StartTime, "end": parseInt(this.EndTime) == 175 ? "10000" : this.EndTime }
    }
    // using built in JSON utility package turn object to string and store in a variable
    const raw = JSON.stringify(event_data);
    this.selectionService.setSelection(raw);
    this.router.navigate(['result']);
  }

  updateStartTime(start_time: string) {
    this.StartTime = start_time
  }

  updateEndTime(end_time: string) {
    this.EndTime = end_time
  }

  updateCTPositions(ct_positions: string[]) {
    this.CTPositions = ct_positions;
  }

  updateTPositions(t_positions: string[]) {
    this.TPositions = t_positions;
  }

  updateMap(map: string) {
    this.Map = map
  }

  updateCTAllowed(allowed: string[]) {
    this.CTAllowed = allowed;
  }

  updateCTForbidden(forbidden: string[]) {
    this.CTForbidden = forbidden;
  }

  updateCTType(type: string) {
    this.CTType = type
  }

  updateTAllowed(allowed: string[]) {
    this.TAllowed = allowed;
  }

  updateTForbidden(forbidden: string[]) {
    this.TForbidden = forbidden;
  }

  updateTType(type: string) {
    this.TType = type
  }

  updateKillAllowed(allowed: string[]) {
    this.KillAllowed = allowed;
  }


  updateKillType(type: string) {
    this.KillType = type
  }

}
