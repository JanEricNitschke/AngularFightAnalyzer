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
import { ExplanationComponent } from './explanation/explanation.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { ConsentService } from './consent.service';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { ImpressumComponent } from './impressum/impressum.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'main.d225v44fsxss8s.amplifyapp.com' // or 'your.domain.com'
  },
  "palette": {
    "popup": {
      "background": "#461506",
      "text": "#FF9900",
      "link": "#ffffff"
    },
    "button": {
      "background": "#461506",
      "text": "#FF9900",
      "border": "transparent"
    }
  },
  theme: 'edgeless',
  type: 'opt-in',
  "content": {
    "message": "I use cookies to store your fight selection. That's it!",
    "dismiss": "Got it!",
    "deny": "Refuse cookies",
    "link": "Learn more",
    "href": "https://cookiesandyou.com",
    "policy": "Cookie Policy"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    FightSelectorComponent,
    ResultDisplayComponent,
    MapSelectorComponent,
    WeaponSelectorComponent,
    TimeSelectorComponent,
    ButtonListComponent,
    InformationDisplayComponent,
    ExplanationComponent,
    ImpressumComponent
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
    MatButtonToggleModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [CookieService, ConsentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
