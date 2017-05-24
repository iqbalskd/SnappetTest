import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { snappetService } from './shared/snappet.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { nvD3 } from 'ng2-nvd3'



import { HomeComponent } from './home/home.component';
import { correctComponent } from './correct/correct.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    correctComponent,
    HomeComponent,
    ProgressComponent,
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
    snappetService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
