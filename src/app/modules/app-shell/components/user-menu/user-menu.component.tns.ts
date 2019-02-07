import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'da-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
  @Input() unreadMessages: number;

  @Output() logout = new EventEmitter<void>();
  @Output() openModal = new EventEmitter<void>();
}
