import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( public http: HttpClient, public _usuarioService: UsuarioService) {
    // console.log('hospital service');
   }

   loadHospitals(desde) {
      const url = URL_SERVICE + '/hospital' + '?desde=' + desde;

      return this.http.get(url);
   }

   loadHospitalID(id: string) {
    const url = URL_SERVICE + '/hospital/' + id;

    return this.http.get(url);
 }

   deletehospital(id: string) {
    const url = URL_SERVICE + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
   }

   updateHospital ( hospital: Hospital ) {
    const url = URL_SERVICE + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital)
        .pipe( map((response: any) => {
         Swal.fire(
           'Hospital actualizado',
           response.hospital.name,
           'success'
         );
         return true;

       }));
  }

  saveHospital ( name: string ) {
    const url = URL_SERVICE + '/hospital' + '?token=' + this._usuarioService.token;

    return this.http.post( url, {name})
        .pipe( map((response: any) => {
         Swal.fire(
           'Hospital creado',
           response.hospital.name,
           'success'
         );
         return true;

       }));
  }

  searchHospitals(termino: string) {
    const url = URL_SERVICE + '/busqueda/coleccion/hospital/' + termino;

     return this.http.get(url)
       .pipe( map(( response: any) => {
         return response.hospitales;
       }))
  }
}
