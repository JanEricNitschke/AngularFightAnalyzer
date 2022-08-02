import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.css']
})
export class ExplanationComponent implements OnInit {

  example_map = new Map<string, string[]>();
  selectedExample: string = "";
  example_keys: string[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.example_map.set("d2mid", ["../../assets/examples/dust2_mid_full.png", "1"]);
    this.example_map.set("infmid", ["../../assets/examples/inferno_mid_full.png", "2"]);
    this.example_map.set("mirmid", ["../../assets/examples/mirage_mid_full.png", "3"]);
    this.example_map.set("infpit", ["../../assets/examples/inferno_pit_full.png", "4"]);
    this.example_keys = Array.from(this.example_map.keys());
  }

  GoToSelector() {
    this.router.navigate(['selector']);
  }

}
