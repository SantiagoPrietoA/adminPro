import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../providers/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../providers/service.index';

const routes: Routes = [
  
    
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
      { path: 'graph1', component: Graph1Component, data: { titulo: 'Gráficas'}},
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuraciones del tema'}},
      { path: 'promises', component: PromisesComponent, data: { titulo: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'ReactiveX'}},
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil'}},
      { path: 'search/:termino', component: SearchComponent, data: { titulo: 'Busqueda'}},
      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}, canActivate: [AdminGuard] },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'}},
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos'}},
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Cear medico'}},

      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
