import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( public router: Router, private title: Title, meta: Meta) {
    
    this.getDataRouter().subscribe( event => {
      this.titulo = event.titulo;
      this.title.setTitle(event.titulo);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: event.titulo
      };
    });
   }

  ngOnInit() {
  }

  getDataRouter() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd ) => event.snapshot.firstChild === null),
      map( ( event: ActivationEnd ) => event.snapshot.data)

    );
  }

}
