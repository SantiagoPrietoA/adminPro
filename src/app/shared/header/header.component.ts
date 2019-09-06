import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../providers/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  search(termino: string) {
    this.router.navigate(['/search', termino]);
    termino = '';
  }

}
