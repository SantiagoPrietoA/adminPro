import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicosService } from '../../providers/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalRegistros: number = 0;
  desde: number = 0;

  isLoading: boolean = false;

  constructor( public _medicosService: MedicosService) { }

  ngOnInit() {
    this.loadMedicos();
  }

  loadMedicos() {
    this.isLoading = true;
    this._medicosService.loadMedicos(this.desde)
      .subscribe((response: any) => {
        this.medicos = response.medico;
        this.totalRegistros = response.total;
        this.isLoading = false;
      })
  }

  searchMedicos(termino: string) {

    if ( termino === '') {
      this.loadMedicos();
      return;
    }

    this.isLoading = true;
    
    this._medicosService.searchMedicos(termino)
      .subscribe( (medicos: Medico[]) => {
        this.medicos = medicos;
        this.isLoading = false;
      })

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
    this.loadMedicos();
  }

  deleteMedico( medico: Medico ) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "Estás seguro que quieres eliminar a " + medico.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, eliminarlo'
    }).then((result) => {
      if (result.value) {
       
        this._medicosService.deleteMedico(medico._id)
        .subscribe(response => {
          Swal.fire(
            'Borrado!',
            'El médico fue borrado',
            'success'
            );
          this.loadMedicos();
          })
      }
    })
  }


}
