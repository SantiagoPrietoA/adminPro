import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements  CanActivate {

  constructor( public _usuarioService: UsuarioService, public router: Router) {}


  canActivate() {
    if (this._usuarioService.isLogin()) {
      console.log('pasó por el Guard');
      return true

    }else {
      console.log('login invalido');
      this.router.navigate(['/login']);
      return false
    }
  }
}
