import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICE } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFile/upload-file.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public _uploadFileService: UploadFileService) {
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

   updateUser ( usuario: Usuario ) {
     const url = URL_SERVICE + '/usuarios/' + usuario._id + '?token=' + this.token;

     return this.http.put( url, usuario)
         .pipe( map((response: any) => {

          if( usuario._id === this.usuario._id) {
            const usuarioDB: Usuario = response.usuario;
            this.saveStorage(usuarioDB._id, this.token, this.usuario);

          }
          Swal.fire(
            'Usuario actualizado',
            response.usuario.name,
            'success'
          );
          return true;

        }));
   }

   changeImg (archivo: File, id: string) {
     console.log('archivo:', archivo);
     this._uploadFileService.uploadFile(archivo, 'usuarios', id)
       .then( (response: any) => {
         this.usuario.img = response.usuario.img;
         Swal.fire(
          'Imagen actualizada',
          response.usuario.name,
          'success'
        );
         this.saveStorage(id, this.token, this.usuario);
       })
       .catch( response => {
         console.log(response);
       })

   }

   loadUsers( desde: number = 0) {
     const url = URL_SERVICE + '/usuarios?desde=' + desde;

     return this.http.get(url);
   }

   searchUsers(termino: string) {
     const url = URL_SERVICE + '/busqueda/coleccion/usuario/' + termino;

     return this.http.get(url)
       .pipe( map(( response: any) => {
         return response.usuarios;
       }))
   }

   deleteUser( id: string) {

    const url = URL_SERVICE + '/usuarios/' + id + '?token=' + this.token;
    return this.http.delete(url);
   }
}
