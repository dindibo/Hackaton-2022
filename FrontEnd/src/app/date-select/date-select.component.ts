import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit, OnChanges {

  inputDate: string = "yuvyguvgu";

  constructor() { }

  @Output("change")
  onDateChange(): string{
    return this.inputDate;
  }

  ngOnChanges(changes: SimpleChanges): void {
    alert(1)
  }

  ngOnInit(): void {
  }

  

}
