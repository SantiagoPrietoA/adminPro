import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../providers/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  isloading: boolean = false;

  constructor( public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadUSers();
    // notificación de exito en la subidad e la imagen y recarga de los datos
    this._modalUploadService.notificacion.subscribe( response => this.loadUSers());
  }

  // funcion para despleagr el modal de cambio de imagen
  showModal( id: string) {
    this._modalUploadService.showModal( 'usuarios', id);
  }

  loadUSers() {
    this.isloading = true;
    this._usuarioService.loadUsers(this.desde)
        .subscribe((response: any) => {
          this.totalRegistros = response.total;
          this.usuarios = response.usuarios;
          this.isloading = false;
        });
  }

  loadMore(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);

    if (desde < 0 ) {
      return
    }
    if( desde >= this.totalRegistros ) {
      return;
    }

    this.desde += valor;
    this.loadUSers();
  }

  searchUser(termino: string) {

    if ( termino === '') {
      this.loadUSers();
      return;
    }

    this.isloading = true;
    
    this._usuarioService.searchUsers(termino)
      .subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.isloading = false;
      })

  }

  deleteUser( usuario: Usuario ) {
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire(
        'Error',
        'No es posible borarrse a si mismo',
        'error'
      );
      return;
    }

    Swal.fire({
      title: 'Estás seguro?',
      text: "Estás seguro que quieres eliminar a " + usuario.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
       
        this._usuarioService.deleteUser(usuario._id)
        .subscribe(response => {
          Swal.fire(
            'Borrado!',
            'El usuario fue borrado',
            'success'
            );
          this.loadUSers();
          })
      }
    })
  }


  saveUser(usuario: Usuario ) {
    // console.log(usuario);
    this._usuarioService.updateUser(usuario)
      .subscribe();
  }

}
