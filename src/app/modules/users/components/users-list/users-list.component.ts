import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'da-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
