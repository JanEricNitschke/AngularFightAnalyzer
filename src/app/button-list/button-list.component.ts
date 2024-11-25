import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { MapsWeaponsService } from "../maps-weapons.service";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-button-list",
  templateUrl: "./button-list.component.html",
  styleUrls: ["./button-list.component.css"],
  standalone: false,
})
export class ButtonListComponent implements OnInit, OnChanges {
  ContentNotSelected: string[] = [];
  ContentSelected: string[] = [];
  contentCtrl = new FormControl();
  filteredContent: Observable<string[]>;
  initialized: Boolean = false;
  @Input() ContentType = "";
  @Input() Name = "";
  @Output() contentEvent = new EventEmitter<string[]>();

  constructor(private mapsweaponsService: MapsWeaponsService) {
    this.filteredContent = this.contentCtrl.valueChanges.pipe(
      startWith(""),
      map((content) =>
        content
          ? this._filterContent(content)
          : this.ContentNotSelected.slice(),
      ),
    );
  }

  ngOnInit(): void {
    this.getContent();
    this.initialized = true;
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.initialized) {
      this.reset();
    }
  }

  displayNull(_: any) {
    return "";
  }

  getContent(): void {
    this.mapsweaponsService
      .getList(this.ContentType)
      .subscribe((list) => (this.ContentNotSelected = list));
  }

  setSettings(list_data: string[]) {
    this.reset();
    this.ContentSelected = list_data;
    this.ContentNotSelected = this.ContentNotSelected.filter(
      (item) => !list_data.includes(item),
    );
    this.contentCtrl.setValue("");
    this.submitContent(this.ContentSelected);
  }

  reset() {
    this.getContent();
    this.ContentSelected = [];
    this.contentCtrl.setValue("");
    this.submitContent(this.ContentSelected);
  }

  addElement(content: string): void {
    this.ContentSelected.push(content);
    this.ContentNotSelected = this.ContentNotSelected.filter(
      (item) => item != content,
    );
    this.submitContent(this.ContentSelected);
    this.contentCtrl.setValue("");
  }
  removeElement(content: string): void {
    this.ContentNotSelected.push(content);
    this.ContentSelected = this.ContentSelected.filter(
      (item) => item != content,
    );
    this.submitContent(this.ContentSelected);
    this.contentCtrl.setValue("");
  }

  submitContent(value: string[]) {
    this.contentEvent.emit(value);
  }

  private _filterContent(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.ContentNotSelected.filter(
      (content) => content.toLowerCase().indexOf(filterValue) === 0,
    );
  }
}
