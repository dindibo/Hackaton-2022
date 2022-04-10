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
  @ViewChild('map',{static:true}) mapElement: any;
  map: google.maps.Map | null = null;

  constructor(private http: HttpService) {}

  ngOnInit(): void {

    var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

   const mapProperties = {
        center: sanFrancisco,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
   this.http.getPositions(new Date()).subscribe(arr => {
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: arr
    });
    heatmap.setMap(this.map);
   })
   
}
}

