import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
