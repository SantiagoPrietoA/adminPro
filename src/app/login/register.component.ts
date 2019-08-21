import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from '../providers/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public _usuarioService: UsuarioService, public router: Router) { }

  equals(item1: string, item2: string) {

    
    return ( grup: FormGroup ) => {
      const pass1 = grup.controls[item1].value;
      const pass2 = grup.controls[item2].value;
      if (pass1 === pass2) {
        return null;
      }

      return {
        equals: true
      }
    }


  }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl(false),
    }, {validators: this.equals('password', 'password2')});

    this.forma.setValue({
      name: 'test ',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      conditions: true
    });
  }

  registerUser() {

    if ( this.forma.invalid) {
      return;
    }

    if (this.forma.value.conditions === false ) {
      return Swal.fire({
        title: 'Atención',
        text: 'Debe aceptar las politicas de privacidad',
        type: 'warning',
      });
    }

    console.log('forma valida: ' + this.forma.valid);
    console.log(this.forma.value);

    let usuario = new Usuario(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password,
    );

    this._usuarioService.createUser(usuario).subscribe( Response => {
      console.log(Response);
      this.router.navigate(['/login']);
    });
  }

}
