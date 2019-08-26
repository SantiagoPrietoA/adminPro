import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  uploadImg: File = null;

  imgTemp: string | ArrayBuffer;

  constructor( public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
   }

  ngOnInit() {
  }

  save(usuario: Usuario) {
    // console.log(usuario);
    this.usuario.name = usuario.name;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;

    }

    this._usuarioService.updateUser(this.usuario)
        .subscribe( );
  }

  selectedImg( archivo: File) {

    if( !archivo ) {
      this.uploadImg = null;
      return;
    }

    if( archivo.type.indexOf('image') < 0) {
      Swal.fire(
        'Archivo invalido',
        'verifique que el archivo sea una imagen',
        'error'
      );
      this.uploadImg = null;
      return;

    }

    this.uploadImg = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onload = () => this.imgTemp = reader.result;
  }

  changeImg() {
    this._usuarioService.changeImg(this.uploadImg, this.usuario._id);
  }
}
