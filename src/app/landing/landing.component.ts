import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;

  constructor() { }

  ngOnInit() {}

}
