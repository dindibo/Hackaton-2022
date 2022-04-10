import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {} from 'googlemaps';
import { of,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getPositions(date : string):Observable<Array<google.maps.visualization.WeightedLocation>>{
    return of([
      {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
      {location: new google.maps.LatLng(37.782, -122.445), weight: 1},

      {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
      {location: new google.maps.LatLng(37.782, -122.4431), weight: 2},
      {location: new google.maps.LatLng(37.782, -122.4432), weight: 2},
      {location: new google.maps.LatLng(37.782, -122.4429), weight: 2},
      {location: new google.maps.LatLng(37.782, -122.4428), weight: 2},
      {location: new google.maps.LatLng(37.7821, -122.443), weight: 2},
      {location: new google.maps.LatLng(37.7819, -122.4429), weight: 2},
      {location: new google.maps.LatLng(37.7821, -122.4431), weight: 2},
      
      {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
      {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
      {location: new google.maps.LatLng(37.782, -122.437), weight: 1},
      {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},
    
      {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
      {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
      {location: new google.maps.LatLng(37.785, -122.443), weight: 1},
      {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
      {location: new google.maps.LatLng(37.785, -122.439), weight: 1},
      {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
      {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
    ]);
  }
}
