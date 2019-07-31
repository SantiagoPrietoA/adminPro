import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Pricipal',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Dashboard', url: '/dashboard'},
        {title: 'Progreso', url: '/progress'},
        {title: 'Grafica 1', url: '/graph1'},
      ]
    }
  ];

  constructor() { }
}
