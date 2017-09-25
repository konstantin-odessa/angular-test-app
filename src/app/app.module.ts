import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { MainService } from './main/main.service';
import { HttpModule } from '@angular/http';

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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
