import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuarios'): any {

    let url = URL_SERVICE + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuarios':
        url += '/usuarios/' + img;
      break;

      case 'medicos':
        url += '/medicos/' + img;
      break;

      case 'hospitales':
         url += '/hospitales/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuarios, medicos, hospitales');
        url += '/usurios/xxx';
    }

    return url;
  }

}



