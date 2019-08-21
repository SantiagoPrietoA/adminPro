import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../providers/service.index';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberme = false;
  email: string;
  auth2: any;

  constructor( public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberme = true;
    }
  }

  googleInit() {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1079052932704-ksg2ajvva9vq6k7251hej5fs5gidt26p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.attachSignin( document.getElementById('btnGoogle'))
      });

  }

  attachSignin(element) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe( response => {
          window.location.href = '#/dashboard';
        })
    });
  }


  submit( forma: NgForm) {
    // this.router.navigate([ '/dashboard' ]);

    if( forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);


    this._usuarioService.login(usuario, forma.value.rememberme)
          .subscribe( response => {

            this.router.navigate([ '/dashboard' ]);
          })

  }

}
