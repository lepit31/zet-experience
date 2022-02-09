import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import {FaqComponent} from './custom/faq/faq.component';
import {FeelingFutureComponent} from './custom/feeling-future/feeling-future.component';
import { HttpClientModule } from '@angular/common/http';
import {ZernerComponent} from './custom/zener/zerner.component';
import {MontyHallComponent} from './custom/monty-hall/monty-hall.component';
import { MontyHallGameComponent } from './custom/monty-hall/monty-hall-game/monty-hall-game.component';
import {CommonModule} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BayesianComponent} from './custom/bayesian/bayesian.component';
import {BayesianRoswellComponent} from './custom/bayesian-roswell/bayesian-roswell.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    FaqComponent,
    FeelingFutureComponent,
    ZernerComponent,
    MontyHallComponent,
    MontyHallGameComponent,
    BayesianComponent,
    BayesianRoswellComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HomeModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        FontAwesomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
