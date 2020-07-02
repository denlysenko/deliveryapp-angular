import { inject, TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('[Web] Loader Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
  });

  describe('start()', () => {
    it('should send true to subscribers', inject(
      [LoaderService],
      (service: LoaderService) => {
        let result: boolean;

        service.isLoading$.subscribe((loading) => {
          result = loading;
        });

        service.start();
        expect(result).toBeTruthy();
      }
    ));
  });

  describe('stop()', () => {
    it('should send false to subscribers', inject(
      [LoaderService],
      (service: LoaderService) => {
        let result: boolean;

        service.isLoading$.subscribe((loading) => {
          result = loading;
        });

        service.start();
        expect(result).toBeTruthy();
      }
    ));
  });
});
