import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MainService } from './main.service';

declare var DG: any;

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
    map: any;
    markersList: any[] = [];

    constructor(private mainService: MainService) {
    }

    initMap(): void {
        this.map = DG.map('map', {
            center: [54.98, 82.89],
            zoom: 13
        });
    }
    initMarkerClickHandler() {
        const _this = this;
        this.map.on('click', function(e){
            const marker = new DG.marker(e.latlng).addTo(_this.map);
            _this.markersList.push({id: marker._leaflet_id, coords: marker.getLatLng() });
            console.log(_this.markersList);
            marker.once('click', function(markerEvent) {
                _this.map.removeLayer(marker);
                _this.markersList = _this.markersList.filter(item => item.id !== marker._leaflet_id);
                console.log(_this.markersList);
            });
        });
    }
    locateUser(): void {
        const _this = this;
        this.map.locate({setView: true, watch: true})
            .on('locationfound', function (e) {
                // DG.marker([e.latitude, e.longitude]).addTo(_this.map);
            })
            .on('locationerror', function (e) {
                DG.popup()
                    .setLatLng(this._this.getCenter())
                    .setContent('Доступ к определению местоположения отключён')
                    .openOn(this._this);
            });
    }

    saveMarkers() {
        this.mainService.postMarkers(this.markersList);
    }

    ngOnInit() {
        const _this = this;

        console.log(DG);
        DG.then(function () {
            _this.initMap();
            _this.initMarkerClickHandler();
            _this.locateUser();
        });
    }
    ngAfterViewInit() {
    }

}

export interface LatLng {
    id: number;
    lat: number;
    lng: number;
}

