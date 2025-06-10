import { Component, Input, OnInit, inject } from "@angular/core";
import { InformationService } from "../information.service";

@Component({
  selector: "app-information-display",
  templateUrl: "./information-display.component.html",
  styleUrls: ["./information-display.component.css"],
  standalone: false,
})
export class InformationDisplayComponent implements OnInit {
  private informationService = inject(InformationService);

  InformationContent: string = "";
  @Input() Type = "";

  ngOnInit(): void {
    this.getInformationContent();
  }

  getInformationContent(): void {
    this.informationService
      .getInformation(this.Type)
      .subscribe((information) => (this.InformationContent = information));
  }
}
