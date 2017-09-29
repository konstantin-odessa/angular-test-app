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
    markersList: Marker[] = [];

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
            const marker: Marker = new Marker(e._leaflet_id, e.latlng);
            const leafletMarker = marker.getLeafletMarker();
            _this.markersList.push(marker);
            leafletMarker.addTo(_this.map);

            // const marker = new DG.marker(e.latlng).addTo(_this.map);
            // _this.markersList.push({id: marker._leaflet_id, coords: marker.getLatLng() });

            console.log(_this.markersList);
            leafletMarker.once('click', function() {
                _this.map.removeLayer(leafletMarker);
                _this.markersList = _this.markersList.filter(item => item.id !== leafletMarker._leaflet_id);
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

    saveMarkers(): void {
        this.mainService.postMarkers(this.markersList);
    }
    loadMarkers(): void {
        const self = this;
        this.mainService.getMarkers()
            .then((data) => {
                this.markersList = data;
                this.markersList.forEach((marker: Marker) => {
                    const leafletMarker = marker.getLeafletMarker().addTo(this.map);
                    leafletMarker.once('click', function() {
                        self.map.removeLayer(marker);
                        self.markersList = self.markersList.filter(item => item.id !== leafletMarker._leaflet_id);
                        console.log(self.markersList);
                    });
                });
            });
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


export class Marker {
    id: number;
    latLng: LatLng;

    constructor(id: number, latLng: LatLng) {
        this.id = id;
        this.latLng = latLng;
    }

    getLeafletMarker() {
        return DG.marker(this.latLng);
    }
}

export interface LatLng {
    lat: number;
    lng: number;
}

