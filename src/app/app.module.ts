import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Modulos

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

// Providers
import { ServiceModule } from './providers/service.module'


// Rutas
import { AppRoutingModule } from './app-routing.module';

// temporales

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    RegisterComponent,
    PagesComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    AppRoutingModule, // ubicar siempre al final para que reconozca las rutas hijas tambien
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
