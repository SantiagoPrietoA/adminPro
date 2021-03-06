import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  LoginGuardGuard,
  UploadFileService,
  ModalUploadService,
  HospitalService,
  MedicosService,
  AdminGuard
} from './service.index';


@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    MedicosService,
    AdminGuard
  ]
})
export class ServiceModule { }
