import { Component } from '@angular/core';

import { LoaderService } from '@core/services/loader/loader.service';

@Component({
  selector: 'da-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loaderService: LoaderService) {}
}
