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
            zoom: 13,
            worldCopyJump: true,
        });
    }

    initMarkerClickHandler() {
        const _this = this;
        this.map.on('click', function(e){
            const marker: Marker = new Marker(e.latlng);
            const leafletMarker = marker.getLeafletMarker();
            _this.markersList.push(marker);
            leafletMarker.addTo(_this.map);

            console.log(_this.markersList);
            _this.onMarkerRemove(leafletMarker);
        });
    }
    onMarkerRemove(leafletMarker: any) {
        const self = this;
        leafletMarker.once('click', function() {
            self.map.removeLayer(leafletMarker);
            self.markersList = self.markersList.filter(item => item.latLng !== leafletMarker.getLatLng());
            // self.markersList = self.markersList.filter(item => item.id !== leafletMarker._leaflet_id);
            console.log(self.markersList);
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

    addMarkerToList(marker: any): void {
        this.markersList.push(new Marker(marker.getLatLng()));
    }
    showMarkersOnMap(markers: Marker[]): void {
        markers.forEach((marker: Marker) => marker.getLeafletMarker().addTo(this.map));
    }

    saveMarkers(): void {
        this.mainService.postMarkers(this.markersList)
            .then(result => {
                console.log(`markers were successfully saved`);
                console.log(result);
            })
            .catch(this.handleError);
    }
    loadMarkers(): void {
        const self = this;
        this.mainService.getMarkers()
            .then((data) => {
                this.markersList = data;
                this.markersList.forEach((item: any) => {
                    const marker = new Marker(item.latLng);
                    const leafletMarker = marker.getLeafletMarker();
                    leafletMarker.addTo(self.map);
                    self.onMarkerRemove(leafletMarker);
                    console.log(`markers were successfully loaded`);
                });
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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

    constructor(latLng: LatLng) {
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

