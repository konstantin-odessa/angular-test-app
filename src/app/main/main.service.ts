import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MainService {
    constructor(private httpService: Http) {}

    postMarkers(markers: any[]): void {
        const url: string = 'http://localhost:3000/markers';
        const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        const body: any = JSON.stringify(markers);
        const options: RequestOptions = new RequestOptions({ headers: headers });
        this.httpService.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    getMarkers(): Promise<any> {
        const url: string = 'http://localhost:3000/all';
        return this.httpService.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        const body = res.json();
        console.log(body);
        return body.data || {};
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
