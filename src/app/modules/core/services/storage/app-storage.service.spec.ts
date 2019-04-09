import { inject, TestBed } from '@angular/core/testing';

import { AppStorageService } from './app-storage.service';

describe('AppStorageService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AppStorageService]
    })
  );

  it('should be created', () => {
    const service: AppStorageService = TestBed.get(AppStorageService);
    expect(service).toBeTruthy();
  });

  describe('getItem()', () => {
    it('should call get item from inner storage', inject(
      [AppStorageService],
      (service: AppStorageService) => {
        const key = 'key';
        const value = 'value';
        service.setItem(key, value);
        service.getItem(key);
        expect(service.getItem(key)).toEqual(value);
      }
    ));
  });

  describe('setItem()', () => {
    it('should set item to inner storage', inject(
      [AppStorageService],
      (service: AppStorageService) => {
        const key = 'key';
        const value = 'value';
        service.setItem(key, value);
        expect(service.getItem(key)).toEqual(value);
      }
    ));
  });

  describe('removeItem()', () => {
    it('should remove item from inner storage', inject(
      [AppStorageService],
      (service: AppStorageService) => {
        const key = 'key';
        const value = 'value';
        service.setItem(key, value);
        expect(service.getItem(key)).toEqual(value);
        service.removeItem(key);
        expect(localStorage.getItem(key)).toBeNull();
      }
    ));
  });
});
