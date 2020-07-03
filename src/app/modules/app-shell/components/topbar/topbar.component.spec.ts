import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';

const LOGOUT_LABEL = 'Logout';
const MESSAGES_LABEL = 'Messages';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('menu items should be defined', () => {
    expect(component.items).toBeDefined();
    expect(component.items.length).toEqual(3);
  });

  describe('logout', () => {
    beforeEach(() => {
      spyOn(component.logout, 'emit');
    });

    it('should emit logout event', () => {
      const logoutItem = component.items.find(
        (item) => item.label === LOGOUT_LABEL
      );
      logoutItem.command();
      expect(component.logout.emit).toBeCalled();
    });
  });

  describe('openSidebar', () => {
    beforeEach(() => {
      spyOn(component.openSidebar, 'emit');
    });

    it('should emit openSidebar event', () => {
      const messagesItem = component.items.find(
        (item) => item.label === MESSAGES_LABEL
      );
      messagesItem.command();
      expect(component.openSidebar.emit).toBeCalled();
    });
  });
});
