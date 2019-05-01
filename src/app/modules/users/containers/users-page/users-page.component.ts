import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '@base/BaseComponent';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent,
  ValidationError
} from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';

import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  skip,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { User, UsersFilter } from '../../models';
import { UsersService } from '../../services/users.service';
import { UsersFacade } from '../../store';

const SUCCESS_MESSAGE = 'User saved!';

@Component({
  selector: 'da-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent extends BaseComponent implements OnInit {
  users: User[];
  count: number;

  filter$ = this.usersFacade.filter$;
  sorting$ = this.usersFacade.sorting$;
  pagination$ = this.usersFacade.pagination$;
  current$ = this.usersFacade.current$;

  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<ValidationError | null>(null);

  constructor(
    private usersFacade: UsersFacade,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private usersService: UsersService,
    private feedbackService: FeedbackService
  ) {
    super();
  }

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  get error$(): Observable<ValidationError | null> {
    return this.error.asObservable();
  }

  ngOnInit() {
    this.count = this.route.snapshot.data.users.count;
    this.users = this.route.snapshot.data.users.rows;
    this.subscribeToFiltersChanges();
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
        }),
        withLatestFrom(this.usersFacade.allFilters$),
        switchMap(([_, usersFilter]) => this.fetchUsers(usersFilter))
      )
      .subscribe(
        () => {
          this.feedbackService.success(SUCCESS_MESSAGE);
        },
        err => {
          this.loading.next(false);
          this.error.next(err);
        }
      );
  }

  private fetchUsers(usersFilter: UsersFilter) {
    this.loaderService.start();

    return this.usersService.getUsers(usersFilter).pipe(
      tap(({ count, rows }) => {
        this.loaderService.stop();
        this.users = rows;
        this.count = count;
      }),
      catchError(() => {
        this.loaderService.stop();
        return EMPTY;
      })
    );
  }

  private subscribeToFiltersChanges() {
    this.usersFacade.allFilters$
      .pipe(
        skip(1),
        switchMap(usersFilter => this.fetchUsers(usersFilter)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
