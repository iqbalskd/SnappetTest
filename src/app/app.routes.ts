import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProgressComponent } from './progress/progress.component';
import { correctComponent } from './correct/correct.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'correct', component: correctComponent }
];

