import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FightSelectorComponent } from './fight-selector/fight-selector.component';
import { ResultDisplayComponent } from './result-display/result-display.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { ImpressumComponent } from './impressum/impressum.component';

const routes: Routes = [
  { path: '', redirectTo: '/explanation', pathMatch: 'full' },
  { path: 'selector', component: FightSelectorComponent },
  { path: 'result', component: ResultDisplayComponent },
  { path: 'explanation', component: ExplanationComponent },
  { path: 'impressum', component: ImpressumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }