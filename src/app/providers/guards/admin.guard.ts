import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements  CanActivate {


  constructor(
    public _usuarioService: UsuarioService,
  ) {}

  canActivate() {

    if( this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;

    } else {
      console.log('bloeuado por el admin guard');
      this._usuarioService.logout();
      return false
    }




  }
  
}
