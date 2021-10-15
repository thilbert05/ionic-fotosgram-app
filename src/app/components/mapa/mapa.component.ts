import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords: string;
  @ViewChild('mapa', {static: true}) mapa: ElementRef<HTMLElement>;
  constructor() { }

  ngOnInit() {
    console.log(this.coords);
    const latLng = this.coords.split(',');
    const lat = +latLng[0];
    const lng = +latLng[1];
    mapboxgl.accessToken = environment.mapboxAPIKEY;
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }

}
