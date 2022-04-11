import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit, OnChanges {
  @Output('change') dateChangeEvent = new EventEmitter<string>();

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    alert(1)
  }

  ngOnInit(): void {
  }

  

}
