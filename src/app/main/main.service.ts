import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class MainService {
    constructor(private httpService: Http) {}

    postMarkers(markers: any[]): void {
        const url: string = 'http://localhost:3000/markers';
        const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        const body: any = JSON.stringify(markers);
        const options: RequestOptions = new RequestOptions({ headers: headers });
        this.httpService.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(data => console.log(data));
    }

    private extractData(res: Response) {
        const body = res.json();
        console.log(body);
        return body.data || {};
    }
    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
