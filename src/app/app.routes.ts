import { Routes } from '@angular/router';

import { BloodPressureComponent } from './bloodPressure/bloodPressure.component';
import { HomeComponent } from './home/home.component';
import { AcqComponent } from './acq/acq.component';
import { BMIComponent } from './bmi/bmi.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bloodPressure', component: BloodPressureComponent },
  { path: 'acq', component: AcqComponent },
  { path: 'bmi', component: BMIComponent }
];

