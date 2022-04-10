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
  heatMapData: Array<google.maps.LatLng|google.maps.visualization.WeightedLocation> = [];

  constructor(private http: HttpService) {}

  ngOnInit(): void {

    
   this.http.getPositions(new Date()).subscribe(arr => {
    this.heatMapData = arr;
   })
   
  }

  onDateChange() {
    this.http.getPositions(new Date()).subscribe(arr => {
      this.heatMapData = arr;
     })
  }
}


