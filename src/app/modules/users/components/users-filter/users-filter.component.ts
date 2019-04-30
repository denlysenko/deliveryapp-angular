import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'da-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFilterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
