import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { User } from '@auth/models';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { Roles } from '@common/enums';

import { UsersService } from '@users/services/users.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'da-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrls: ['./destination-form.component.scss']
})
export class DestinationFormComponent extends BaseFormComponent {
  readonly roles = Roles;

  @Input() form: FormGroup;
  @Input() role: number;
  @Input() errors: { [key: string]: string };

  @Output() next = new EventEmitter<void>();

  private clientProviders = new BehaviorSubject<User[] | null>(null);

  constructor(private usersService: UsersService) {
    super();
  }

  get clients$(): Observable<User[] | null> {
    return this.clientProviders.asObservable();
  }

  searchClient({ query }) {
    this.usersService
      .getUsers({ 'filter[role]': Roles.CLIENT, 'filter[email]': query })
      .pipe(map(response => response.rows))
      .subscribe(users => this.clientProviders.next(users));
  }

  selectClient({ id }) {
    this.form.patchValue({ clientId: id });
  }

  nextStep() {
    if (this.form.valid) {
      this.next.emit();
    } else {
      this.validateAllFormFields(this.form);
    }
  }
}
