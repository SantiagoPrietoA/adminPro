import { Component } from '@angular/core';
import { SettingsService } from './providers/service.index';

declare function init_plugins();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // tslint:disable-next-line:variable-name
  constructor(public _settings: SettingsService) {
    init_plugins();
  }

}
