import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { ButtonListComponent } from '../button-list/button-list.component';
import { RequestData } from '../request-data';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.css']
})
export class MapSelectorComponent implements OnInit {
  maps = ["de_ancient", "de_cache", "de_cbble", "de_dust2", "de_inferno", "de_mirage", "de_nuke", "de_overpass", "de_train", "de_vertigo"]
  selectedMap = "de_dust2"
  CTPositions: string[] = [];
  TPositions: string[] = [];
  @Output() ctEvent = new EventEmitter<string[]>();
  @Output() tEvent = new EventEmitter<string[]>();
  @Output() mapEvent = new EventEmitter<string>();

  @ViewChildren(ButtonListComponent)
  Children: QueryList<ButtonListComponent>

  constructor() { }

  ngOnInit(): void {
  }

  setSettings(settings_data: RequestData) {
    this.selectedMap = settings_data.data.map_name;
    this.submitMap();
    setTimeout(() => this.Children.forEach(c => c.setSettings((settings_data.data.positions as any)[c.Name.split("_")[0]])));
  }

  reset() {
    this.Children.forEach(c => c.reset());
    this.selectedMap = "de_dust2";
    this.submitMap();
  }

  updateCTPositions(ct_positions: string[]) {
    this.CTPositions = ct_positions;
    this.ctEvent.emit(this.CTPositions);
  }

  updateTPositions(t_positions: string[]) {
    this.TPositions = t_positions;
    this.tEvent.emit(this.TPositions);
  }

  submitMap() {
    this.mapEvent.emit(this.selectedMap);
  }
}
