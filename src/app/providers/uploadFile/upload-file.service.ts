import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  // funcion para subir imagen utilizando javaScript
  uploadFile ( archivo: File, tipo: string, id: string) {

    return new Promise( (resolve, reject) => {
      
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append( 'img', archivo, archivo.name);

      // estado de la subida
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve(JSON.parse(xhr.response))
          }
          else {
            console.log('falló la subida');
            reject( JSON.parse(xhr.response));
          }
        }
      }

      let url = URL_SERVICE + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });
  }
}
