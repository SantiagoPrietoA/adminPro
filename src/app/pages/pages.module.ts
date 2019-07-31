import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PagesRoutingModule } from './pages-routing.module';

// ng2-chats
import { ChartsModule } from 'ng2-charts';

// Temporales
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { DougtnutComponent } from '../components/dougtnut/dougtnut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
    IncreaserComponent,
    DougtnutComponent,
    AccountSettingsComponent
  ],
  exports: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
    IncreaserComponent,
    DougtnutComponent,
    AccountSettingsComponent
  ],
  imports: [
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    BrowserModule,  // importado para trabajar con el ngFor dentro del modulo
  ]
})
export class PagesModule { }
