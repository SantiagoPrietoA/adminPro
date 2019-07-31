import { NgModule } from '@angular/core';

import {
  SettingsService,
  SharedService,
  SidebarService
} from './service.index';


@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }
