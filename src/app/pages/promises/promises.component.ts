import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() { 
    this.promiseFunction().then( () => console.log('funciona'));
    this.promiseFunction().catch( (error) => console.log('error'));
  }

  promiseFunction() {
    
    return new Promise( (resolve, reject) => {
      
      let contador = 0;
      let intervalo = setInterval( () => {
        contador = contador + 1;
        console.log(contador);

        if ( contador == 3) {
          resolve( true );
          clearInterval( intervalo );
        }
      }, 1000);

    });

    

  }

  ngOnInit() {
  }

}
