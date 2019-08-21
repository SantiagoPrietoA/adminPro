import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICE } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router) {
    this.loadStorage();
   }

   saveStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
   }

   loadStorage() {
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     } else {
      this.token = '';
      this.usuario = null;
     }
   }

   isLogin() {
     if (this.token.length > 5 ) {
       return true;
     }else {
       return false;
     }
   }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
    // window.location.href = '#/login';

  }

   login( usuario: Usuario, rememberme: boolean = false) {

    console.log(rememberme);

    if (rememberme) {
      localStorage.setItem('email', usuario.email);
    }else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICE + '/login';

    return this.http.post(url, usuario)
        .pipe( map( (response: any) => {
          // localStorage.setItem('id', response.id);
          // localStorage.setItem('token', response.token);
          // localStorage.setItem('usuario', JSON.stringify(response.usuario));
          this.saveStorage(response.id, response.token, response.usuario);
          return true
        }));
   }

   loginGoogle( token ) {
     let url = URL_SERVICE + '/login/google';

     return this.http.post(url, {token})
     .pipe( map( (response: any) => {
      // localStorage.setItem('id', response.id);
      // localStorage.setItem('token', response.token);
      // localStorage.setItem('usuario', JSON.stringify(response.usuario));
      this.saveStorage(response.id, response.token, response.usuario);
      return true
    }));
   }

   createUser( usuario: Usuario) {
     const url = URL_SERVICE + '/usuarios';

     return this.http.post( url, usuario)
     .pipe(
         map( (Response: any) => {
            Swal.fire({
              title: 'Usuario creado',
              text: usuario.email,
              type: 'success',
            });
              return Response.usuario;
         }));
   }
}
