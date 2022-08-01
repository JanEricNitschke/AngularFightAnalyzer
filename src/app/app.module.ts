import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FightSelectorComponent } from './fight-selector/fight-selector.component';
import { ResultDisplayComponent } from './result-display/result-display.component';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { WeaponSelectorComponent } from './weapon-selector/weapon-selector.component';
import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { ButtonListComponent } from './button-list/button-list.component';
import { InformationDisplayComponent } from './information-display/information-display.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FightSelectorComponent,
    ResultDisplayComponent,
    MapSelectorComponent,
    WeaponSelectorComponent,
    TimeSelectorComponent,
    ButtonListComponent,
    InformationDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
