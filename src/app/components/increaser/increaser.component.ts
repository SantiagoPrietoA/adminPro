import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {


  @Input() legend = 'leyenda';
  @Input() percentage = 50;

  @ViewChild('percentageElement', {static: false}) percentageElement: ElementRef;

  @Output() changePercentage: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange( value: number ) {

    if( value >= 100) {
      this.percentage = 100;
    }else if ( value <= 0 ) {
      this.percentage = 0;
    }else if ( value == null ) {
      this.percentage = 0;
    } else {
      this.percentage = value;
    }

    this.percentageElement.nativeElement.value = this.percentage;
    this.changePercentage.emit( this.percentage );
    this.percentageElement.nativeElement.focus();
  }

  changeValue(value: number) {
    if ( this.percentage >= 100 && value > 0) {
      this.percentage = 100;
      return;
    }

    if ( this.percentage <= 0 && value < 0) {
      this.percentage = 0;
      return;
    }

    this.percentage = this.percentage + value;
    this.changePercentage.emit( this.percentage );
  }

}
