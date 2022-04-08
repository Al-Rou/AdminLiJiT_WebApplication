import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EventsComponent} from "./events/events.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AboutComponent} from "./about/about.component";
import {DetailComponetnt} from "./listingDetail/detail.component";
import {TypeComponent} from "./listingType/type.component";
import {LoginComponent} from "./login/login.component";
import {FirstComponent} from "./first/first.component";

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    AboutComponent,
    DetailComponetnt,
    TypeComponent,
    LoginComponent,
    FirstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
