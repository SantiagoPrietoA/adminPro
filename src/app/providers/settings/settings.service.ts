import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  setting: Settigns = {
    themeUrl: `assets/css/colors/default-dark.css`,
    theme: 'default-dark'
  };

  constructor() {
    this.loadStorage();
   }

  saveStorage() {
    localStorage.setItem('setting', JSON.stringify( this.setting ));
  }

  loadStorage() {
    if ( localStorage.getItem('setting')) {
      this.setting = JSON.parse( localStorage.getItem('setting'));
      this.aplyTheme( this.setting.theme );
    } else {
      this.aplyTheme( this.setting.theme );
    }
  }

  aplyTheme( theme: string) {
    const url = `assets/css/colors/${ theme }.css`;
    document.getElementById('theme').setAttribute('href', url);
    this.setting.theme = theme;
    this.setting.themeUrl = url;
  }
}

interface Settigns {
  themeUrl: string;
  theme: string;
}
