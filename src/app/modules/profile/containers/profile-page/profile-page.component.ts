import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  selector: 'da-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  user$ = this.route.data.pipe(map(data => data.profile));

  constructor(private route: ActivatedRoute) {}
}
