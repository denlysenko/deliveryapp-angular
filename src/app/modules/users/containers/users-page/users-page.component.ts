import { Component, OnInit } from '@angular/core';
import { UsersFacade } from '../../store';
import { FilterChangeEvent } from '@common/models';

@Component({
  selector: 'da-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  filter$ = this.usersFacade.filter$;

  constructor(private usersFacade: UsersFacade) {}

  handleFilterChange(event: FilterChangeEvent) {
    this.usersFacade.doFiltering(event);
  }

  ngOnInit() {}
}
