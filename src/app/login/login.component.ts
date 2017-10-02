import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLogged: boolean = false;

    constructor(private authService: AuthService) {}

    login() {
        this.authService.login();
        this.isLogged = true;
    }
    logOut() {
        this.authService.logOut();
        this.isLogged = false;
    }
    toggle() {
        this.isLogged = !this.isLogged;
    }

    ngOnInit() {
    }

}
