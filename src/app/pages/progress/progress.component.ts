import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  percentageOne = 20;
  percentageTwo = 30;

  constructor() { }

  ngOnInit() {
  }

  

}
