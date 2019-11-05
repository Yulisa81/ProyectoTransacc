import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss'],
})
export class ShowErrorComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() field: string;
  @Input() lenght: string = '250';
  @Input() extra: string;
  
  constructor() { }

  ngOnInit() {}

}
