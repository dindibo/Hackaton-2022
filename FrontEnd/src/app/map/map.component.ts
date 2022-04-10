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
  @Input("data")public data: Array<google.maps.visualization.WeightedLocation> = [];
  map: google.maps.Map | null = null;
  heatmap: google.maps.visualization.HeatmapLayer | null = null;
  markersArray: google.maps.Marker[] = [];
  readonly minDist: number = 0.1;

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
    var icon = {
      url: "../assets/police icon.png", // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
  };

    let marker = new google.maps.Marker({
        map: this.map as google.maps.Map,
        position: latLng,
        draggable: true,
        icon: icon,
    });

    //store the marker object drawn on map in global array
    this.markersArray.push(marker);

    var closeHotspots: google.maps.visualization.WeightedLocation[] = this.data.filter(l => this.haversine_distance(marker.getPosition() as google.maps.LatLng, l.location) < this.minDist);
    closeHotspots.forEach(l => l.weight *= 0.5);
    this.heatmap?.setData(this.data);

    var that = this;
    marker.addListener("click", (e) => {
      var closeHotspots: google.maps.visualization.WeightedLocation[] = this.data.filter(l => this.haversine_distance(marker.getPosition() as google.maps.LatLng, l.location) < this.minDist);
      closeHotspots.forEach(l => l.weight /= 0.5);
      this.heatmap?.setData(this.data);
      marker.setMap(null);
    });
  }

  haversine_distance(mk1: google.maps.LatLng, mk2: google.maps.LatLng): number {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat() * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng()-mk1.lng()) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }
}
