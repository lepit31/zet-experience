import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {FaqComponent} from './custom/faq/faq.component';
import {FeelingFutureComponent} from './custom/feeling-future/feeling-future.component';
import {ZernerComponent} from './custom/zener/zerner.component';
import {MontyHallComponent} from './custom/monty-hall/monty-hall.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'user-profile', component: ProfileComponent},
    {path: 'register', component: SignupComponent},
    {path: 'landing', component: LandingComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'feeling-future', component: FeelingFutureComponent},
    {path: 'monty-hall', component: MontyHallComponent},
    {path: 'zener', component: ZernerComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
