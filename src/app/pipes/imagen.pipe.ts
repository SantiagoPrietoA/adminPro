import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';
import { url } from 'inspector';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICE + '/img';

    if ( !img ) {
      return url + '/usuario/x';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
          url += '/medicos/' + img;
          break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;

      default:
        console.log('tipo de imagen no existe');
        url += '/usuarios/x';
    }
    return url;
  }


}
