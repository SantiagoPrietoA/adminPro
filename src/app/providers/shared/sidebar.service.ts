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
        {title: 'Promesas', url: '/promises'},
        {title: 'RXJS', url: '/rxjs'},
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
      {title: 'usuarios', url: '/usuarios'},
      {title: 'medicos', url: '/medicos'},
      {title: 'hospitales', url: '/hospitales'},

      ]
    }
  ];

  constructor() { }
}
