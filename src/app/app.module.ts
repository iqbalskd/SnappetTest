import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { MdVisionService } from './shared/mdVision.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { nvD3 } from 'ng2-nvd3'


import { BloodPressureComponent } from './bloodPressure/bloodPressure.component';
import { HomeComponent } from './home/home.component';
import { BMIComponent } from './bmi/bmi.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AcqComponent } from './acq/acq.component';

@NgModule({
  declarations: [
    AppComponent,
    BloodPressureComponent,
    BMIComponent,
    HomeComponent,
    AcqComponent,
    nvD3
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    MdVisionService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
