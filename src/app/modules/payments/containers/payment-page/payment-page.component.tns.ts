import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  templateUrl: './payment-page.component.tns.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  payment$ = this.route.data.pipe(map(data => data.payment));

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
