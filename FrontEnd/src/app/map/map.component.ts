import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map',{static:true}) mapElement: any;
  @Input("data")public data: Array<google.maps.LatLng|google.maps.visualization.WeightedLocation> = [];
  map: google.maps.Map | null = null;
  heatmap: google.maps.visualization.HeatmapLayer | null = null;
  markersArray: google.maps.Marker[] = [];

  constructor() { }

  ngOnInit(): void {
    var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

   const mapProperties = {
        center: sanFrancisco,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
   this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.data
    });
   this.heatmap.setMap(this.map);
    var that = this;
   this.map.addListener('click', function(e) {
    that.addMarker(e.latLng);
  });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.heatmap?.setData(changes['data'].currentValue);
  }

  addMarker(latLng: google.maps.LatLng) {
    let marker = new google.maps.Marker({
        map: this.map as google.maps.Map,
        position: latLng,
        draggable: true
    });

    //store the marker object drawn on map in global array
    this.markersArray.push(marker);
    var that = this;
    marker.addListener("click", (e) => {marker.setMap(null);});
  }
}
