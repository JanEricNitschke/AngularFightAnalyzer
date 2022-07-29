import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FightSelectorComponent } from './fight-selector/fight-selector.component';
import { ResultDisplayComponent } from './result-display/result-display.component';

const routes: Routes = [
  { path: '', redirectTo: '/selector', pathMatch: 'full' },
  { path: 'selector', component: FightSelectorComponent },
  { path: 'result', component: ResultDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }