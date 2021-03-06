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
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Pipe Modulos
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    // PagesComponent,
    IncreaserComponent,
    DougtnutComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    // ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    SearchComponent
  ],
  exports: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    // PagesComponent,
    IncreaserComponent,
    DougtnutComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    // ModalUploadComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,  // importado para trabajar con el ngFor dentro del modulo
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    PipesModule,
  ]
})
export class PagesModule { }
