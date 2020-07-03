import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  FilterChangeEvent,
  ListResponse,
  PageChangeEvent,
  SortingChangeEvent,
  ValidationError
} from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';

import { BehaviorSubject, EMPTY, merge, Observable } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  skip,
  switchMap,
  tap
} from 'rxjs/operators';

import { User } from '../../models';
import { UsersService } from '../../services/users.service';
import { UsersFacade } from '../../store';

const SUCCESS_MESSAGE = 'User saved!';

@Component({
  selector: 'da-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {
  data$: Observable<ListResponse<User>> = merge(
    this.route.data.pipe(
      map((data: { users: ListResponse<User> }) => data.users)
    ),
    this.usersFacade.allFilters$.pipe(
      skip(1),
      switchMap((usersFilter) => {
        this.loaderService.start();

        return this.usersService.getUsers(usersFilter).pipe(
          catchError(() => EMPTY),
          finalize(() => this.loaderService.stop())
        );
      })
    )
  );

  filter$ = this.usersFacade.filter$;
  sorting$ = this.usersFacade.sorting$;
  pagination$ = this.usersFacade.pagination$;
  current$ = this.usersFacade.current$;

  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<ValidationError | null>(null);

  constructor(
    private readonly usersFacade: UsersFacade,
    private readonly route: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly usersService: UsersService,
    private readonly feedbackService: FeedbackService
  ) {}

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  get error$(): Observable<ValidationError | null> {
    return this.error.asObservable();
  }

  handleFilterChange(event: FilterChangeEvent) {
    this.usersFacade.doFiltering(event);
  }

  handleSortingChange(event: SortingChangeEvent) {
    this.usersFacade.sort(event);
  }

  handlePageChange(event: PageChangeEvent) {
    this.usersFacade.paginate(event);
  }

  selectUser(user: User) {
    this.usersFacade.select(user);
  }

  save(user: User) {
    const { id } = user;

    this.loading.next(true);

    this.usersService[id ? 'updateUser' : 'createUser'](user)
      .pipe(
        tap(() => {
          this.loading.next(false);
        })
      )
      .subscribe(
        () => {
          this.usersFacade.reload();
          this.feedbackService.success(SUCCESS_MESSAGE);
        },
        (err) => {
          this.loading.next(false);
          this.error.next(err);
        }
      );
  }
}
