import { inject, TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [StorageService]
    })
  );

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  describe('getItem()', () => {
    it('should call get item from localStorage', inject(
      [StorageService],
      (service: StorageService) => {
        const key = 'key';
        const value = 'value';
        localStorage.setItem(key, value);
        service.getItem(key);
        expect(localStorage.getItem(key)).toEqual(value);
      }
    ));
  });

  describe('setItem()', () => {
    it('should set item to localStorage', inject(
      [StorageService],
      (service: StorageService) => {
        const key = 'key';
        const value = 'value';
        service.setItem(key, value);
        expect(localStorage.getItem(key)).toEqual(value);
      }
    ));
  });
  describe('removeItem()', () => {
    it('should remove item from localStorage', inject(
      [StorageService],
      (service: StorageService) => {
        const key = 'key';
        const value = 'value';
        localStorage.setItem(key, value);
        expect(localStorage.getItem(key)).toEqual(value);
        service.removeItem(key);
        expect(localStorage.getItem(key)).toBeNull();
      }
    ));
  });
});
