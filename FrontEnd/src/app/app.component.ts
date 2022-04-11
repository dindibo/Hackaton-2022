import { Component,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {} from 'googlemaps';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEnd';
  heatMapData: Array<google.maps.visualization.WeightedLocation> = [];
  dateInput: string = "";

  constructor(private http: HttpService) {}

  ngOnInit(): void {

    
   this.http.getPositions(this.dateInput).subscribe(arr => {
    this.heatMapData = arr;
   })
   
  }

  onDateChange(date: string) {
    this.http.getPositions(date).subscribe(arr => {
      this.heatMapData = arr;
     })
     this.dateInput = date;
  }
}


