import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { BaseListComponent } from '@base/BaseListComponent';

import { actionNames } from '@common/enums';

import { Log } from '../../models';

@Component({
  selector: 'da-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsListComponent extends BaseListComponent implements OnInit {
  readonly actions = actionNames;

  @Input() logs: Log[];
}
