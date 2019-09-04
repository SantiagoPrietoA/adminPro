import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/providers/service.index';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitals: Hospital[] = [];
  totalRegistros: number = 0;
  desde: number = 0;

  isLoading: boolean = false;

  termino: string = '';

  constructor( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { 
    this.loadHospitals()
  }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notificacion.subscribe( response => this.loadHospitals());
  }

  loadHospitals() {
    this.isLoading = true;
    this._hospitalService.loadHospitals(this.desde)
      .subscribe((response: any) => {
        this.hospitals = response.hospitales;
        this.totalRegistros = response.total;
        this.isLoading = false;
      })
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Estás seguro que quieres eliminar " + hospital.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
       
        this._hospitalService.deletehospital(hospital._id)
        .subscribe(response => {
          Swal.fire(
            'Borrado!',
            'El hospital fue borrado',
            'success'
            );
          this.loadHospitals();
          })
      }
    })

  }

  uploadHospital(hospital: Hospital) {

    this._hospitalService.updateHospital(hospital)
      .subscribe((response) => {
          this.loadHospitals();
      })
    

  }

  loadMore(valor: number) {
    let desde = this.desde + valor;

    if (desde < 0 ) {
      return
    }
    if( desde >= this.totalRegistros ) {
      return;
    }

    this.desde += valor;
    this.loadHospitals();
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  async saveHospital() {
    const { value: name } = await Swal.fire({
      title: 'Crear hospital',
      input: 'text',
      inputPlaceholder: 'Ingresar nombre del hospital'
    })
    
    if (name) {
      this._hospitalService.saveHospital(name)
        .subscribe();
    }
  }

  searchHospitals(termino: string) {

    if ( termino === '') {
      this.loadHospitals();
      return;
    }

    this.isLoading = true;
    
    this._hospitalService.searchHospitals(termino)
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitals = hospitales;
        this.isLoading = false;
      })

  }

  showModal( id: string) {
    this._modalUploadService.showModal( 'hospitales', id);
  }

}
