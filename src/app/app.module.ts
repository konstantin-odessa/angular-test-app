import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { MainService } from './main/main.service';
import { HttpModule } from '@angular/http';
import { AUTH0_CONGFIG, AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [
        MainService,
        AuthService,
        AuthGuard,
        {
            provide: AUTH0_CONGFIG,
            useValue: {
                AUTH0_CLIENT_ID: 'I7NtwbpRWdPB7f8bXtrdQgmDYP5d-qA7',
                AUTH0_DOMAIN: 'konstantin-odessa.eu.auth0.com',
            },
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
