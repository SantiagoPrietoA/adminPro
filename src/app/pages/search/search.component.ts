import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICE } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( public activatedRoute: ActivatedRoute, public http: HttpClient) { 

    this.activatedRoute.params
      .subscribe( params => {
        let termino = params['termino']
        this.search(termino);

      })
  }

  ngOnInit() {
  }

  search( termino: string ) {
    const url = URL_SERVICE + '/busqueda/todo/' + termino;

    this.http.get(url)
      .subscribe( (response: any) => {
        this.usuarios = response.usuarios,
        this.medicos = response.medicos,
        this.hospitales = response.hospitales
      })
  }

}
