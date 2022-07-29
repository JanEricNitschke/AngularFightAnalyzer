import { Component, Input, OnInit } from '@angular/core';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-information-display',
  templateUrl: './information-display.component.html',
  styleUrls: ['./information-display.component.css']
})
export class InformationDisplayComponent implements OnInit {
  InformationContent: string = '';
  @Input() Type = '';
  constructor(private informationService: InformationService) { }

  ngOnInit(): void {
    this.getInformationContent();
  }

  getInformationContent(): void {
    this.informationService.getInformation(this.Type).subscribe(information => this.InformationContent = information)
  }

}
