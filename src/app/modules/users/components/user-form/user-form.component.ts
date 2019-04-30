import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'da-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
