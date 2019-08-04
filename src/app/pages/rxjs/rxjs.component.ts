import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription

  constructor() {

    this.subscripcion = this.returnObs().subscribe( 
      numero => console.log('sub ' + numero),
      error => console.log('error ' + error),
      () => console.log('terminó')
    );

   }

   
   ngOnInit() {
  }
  
  ngOnDestroy() {
    console.log(' salir de la pagina ');
    this.subscripcion.unsubscribe();
  }
  
  returnObs(): Observable<any> {
   return new Observable( observer  => {
     
     let contador = 0;

     let intervalo = setInterval( () => {
       contador = contador + 1;

       let salida = {
         valor: contador
       }
       observer.next( salida ); 

      //  if ( contador  == 3 ) {
      //    clearInterval( intervalo );
      //    observer.complete();
      //  }

       // if ( contador  == 2 ) {
       //   clearInterval( intervalo );
       //   observer.error('error en el observer');
       // }
     }, 1000);

   }).pipe( 
     map( res => {
       return res;
     } ),
     filter( (valor, index) => {
       if ( valor % 2 === 1) {
         return true;
       }
       else return false;
     })
   );

  }
}
