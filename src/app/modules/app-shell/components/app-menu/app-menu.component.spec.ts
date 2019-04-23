import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Roles } from '@common/enums';

import { appMenu } from '../../app-menu';
import { AppMenuComponent } from './app-menu.component';

describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppMenuComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('menu should be defined', () => {
    expect(component.menu).toBeDefined();
    expect(component.menu.length).toEqual(appMenu.length);
  });

  describe('canSee()', () => {
    beforeEach(() => {
      component.role = Roles.CLIENT;
      fixture.detectChanges();
    });

    it('should return `true` if role is presented in passed array', () => {
      expect(component.canSee([Roles.ADMIN, Roles.CLIENT])).toBeTruthy();
    });

    it('should return `false` if role is not presented in passed array', () => {
      expect(component.canSee([Roles.ADMIN])).toBeFalsy();
    });
  });
});
