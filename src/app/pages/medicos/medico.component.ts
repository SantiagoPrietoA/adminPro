import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService } from '../../providers/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { MedicosService } from '../../providers/medicos/medicos.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitals: Hospital[] = [];
  medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor( 
    public _hospitalService: HospitalService, 
    public _medicoService: MedicosService, 
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUpdateService: ModalUploadService
    ) {
    this._hospitalService.loadHospitals(0)
      .subscribe( (response: any) => this.hospitals = response.hospitales);

    activatedRoute.params.subscribe( params => {

      const id = params['id'];

      if( id !== 'nuevo') {
        this.loadMedic(id);
      }
      
    })

   }

  ngOnInit() {
    this._modalUpdateService.notificacion
      .subscribe( (response: any) => {
        this.medico.img = response.medico.img;
      })


  }

  loadMedic(id: string) {
    this._medicoService.loadMedico(id)
      .subscribe( (response: any) => {
        this.medico = response;
        this.medico.hospital = response.hospital._id;
        this.changeHospital(this.medico.hospital);

      })
  }

  saveMedic(f: NgForm) {


    if (f.invalid) {
      return;
    }

    this._medicoService.saveMedico(this.medico)
      .subscribe( (response: any) => {
        Swal.fire(
          'Médico creado!',
          response.name,
          'success'
          );

        this.medico._id = response._id;

        this.router.navigate(['/medico', response._id]);

      });
  }


  changeHospital(event) {

    this._hospitalService.loadHospitalID(event)
      .subscribe( (response: any) => this.hospital = response.hospital);
  }


  changeImg() {
    this._modalUpdateService.showModal('medicos', this.medico._id);
  }

}
