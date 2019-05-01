import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FeedbackService } from '@core/services';

import { TabViewModule } from 'primeng/primeng';

import { of } from 'rxjs';

import { CompanyAddressFormComponent } from '../../components/company-address-form/company-address-form.component';
import { CompanyBankDetailsFormComponent } from '../../components/company-bank-details-form/company-bank-details-form.component';
import { CompanyAddress, CompanyBankDetails } from '../../models';
import { SettingsService } from '../../services/settings.service';
import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;
  let settingsService: SettingsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, TabViewModule],
      declarations: [
        SettingsPageComponent,
        CompanyAddressFormComponent,
        CompanyBankDetailsFormComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                settings: [{}, {}]
              }
            }
          }
        },
        {
          provide: SettingsService,
          useValue: {
            createAddress: jest.fn().mockReturnValue(of({})),
            updateAddress: jest.fn().mockReturnValue(of({})),
            createBankDetails: jest.fn().mockReturnValue(of({})),
            updateBankDetails: jest.fn().mockReturnValue(of({}))
          }
        },
        {
          provide: FeedbackService,
          useValue: {
            success: jest.fn()
          }
        }
      ]
    }).compileComponents();

    settingsService = TestBed.get(SettingsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('saveAddress()', () => {
    it('should call createAddress()', () => {
      const payload: CompanyAddress = {
        id: null,
        country: 'Country',
        city: 'City',
        street: 'Street',
        house: 'House'
      };

      component.saveAddress(payload);
      expect(settingsService.createAddress).toHaveBeenCalledWith(payload);
    });

    it('should call updateAddress', () => {
      const payload: CompanyAddress = {
        id: 1,
        country: 'Country',
        city: 'City',
        street: 'Street',
        house: 'House'
      };

      component.saveAddress(payload);
      expect(settingsService.updateAddress).toHaveBeenCalledWith(payload);
    });
  });

  describe('saveBankDetails()', () => {
    it('should call createBankDetails()', () => {
      const payload: CompanyBankDetails = {
        id: null,
        name: 'Name',
        accountNumber: 'Account Number',
        bin: 'bin',
        swift: 'swift'
      };

      component.saveBankDetails(payload);
      expect(settingsService.createBankDetails).toHaveBeenCalledWith(payload);
    });

    it('should call updateBankDetails()', () => {
      const payload: CompanyBankDetails = {
        id: 1,
        name: 'Name',
        accountNumber: 'Account Number',
        bin: 'bin',
        swift: 'swift'
      };

      component.saveBankDetails(payload);
      expect(settingsService.updateBankDetails).toHaveBeenCalledWith(payload);
    });
  });
});
