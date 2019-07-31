import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../providers/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(  public _settings: SettingsService ) { }

  ngOnInit() {
    this.loadCheck()
  }

  changeColor( theme: string, Link: any ) {

    this.changeCheck( Link );

    const url = `assets/css/colors/${ theme }.css`;

    document.getElementById('theme').setAttribute('href', url);

    this._settings.setting.theme = theme;
    this._settings.setting.themeUrl = url;
    this._settings.saveStorage();

  }
    changeCheck( Link: any ) {

    const seletors: any = document.getElementsByClassName('selector');

    for ( const ref of seletors ) {
        ref.classList.remove('working');
    }

    Link.classList.add('working');
  }

  loadCheck() {
    const seletors: any = document.getElementsByClassName('selector');

    for ( const ref of seletors ) {
        if ( ref.getAttribute('data-theme') === this._settings.setting.theme ) {
          ref.classList.add('working');
          break;
        }
    }
  }

}
