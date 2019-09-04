import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor( public http: HttpClient, public _usuarioService: UsuarioService) { }

  loadMedicos(desde) {
    const url = URL_SERVICE + '/medico' + '?desde=' + desde;

    return this.http.get(url);
 }

 loadMedico(id: string) {
  const url = URL_SERVICE + '/medico/' + id;

  return this.http.get(url)
    .pipe( map((response: any) => response.medico));
}

 searchMedicos(termino: string) {
     const url = URL_SERVICE + '/busqueda/coleccion/medico/' + termino;

     return this.http.get(url)
       .pipe( map(( response: any) => {
         return response.medicos;
       }))
   }

   deleteMedico(id: string) {
    const url = URL_SERVICE + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
   }

   saveMedico(medico: Medico) {
    let url = URL_SERVICE + '/medico' ;

    if ( medico._id) {
      // actualizar
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
      .pipe( map(( response: any) => {
        return response.medico;
      }))
    }else {

      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
        .pipe( map(( response: any) => {
          return response.medico;
        }))
    }
  }
}
