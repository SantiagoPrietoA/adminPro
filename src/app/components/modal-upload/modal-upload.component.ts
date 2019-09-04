import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadFileService } from '../../providers/uploadFile/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  uploadImg: File = null;

  imgTemp: string | ArrayBuffer;

  // obtencion del elemento inputo para luego ser reseteado al cerrar el modal
  @ViewChild('inputFile',{static: false}) myInputVariable: ElementRef;


  constructor(public _uploadFileService: UploadFileService, public _modalUploadService: ModalUploadService ) {}

  ngOnInit() {
  }


  // funcion de seleccion de imagen
  selectedImg( archivo: File) {

    if( !archivo ) {
      this.uploadImg = null;
      return;
    }

    // verificad si es una imagen
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


    // visualización de la imagen temporal en la vista
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onload = () => this.imgTemp = reader.result;
  }

  // subir imagen cargada 
  uploadImage() {
    this._uploadFileService.uploadFile( this.uploadImg, this._modalUploadService.tipo, this._modalUploadService.id)
      .then( response => {
          this._modalUploadService.notificacion.emit( response );
          this.closeModal()
      })
      .catch( err => {
        console.log('error al cargar ');
      })
  }


  // cerrar el modal y resetear los calores precargados en el modal
  closeModal() {
    this.imgTemp = null;
    this.uploadImg = null;

    this.myInputVariable.nativeElement.value = '';

    this._modalUploadService.hideModal();
  }



}
