import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyBankDetails } from '../../models';
import { CompanyBankDetailsFormComponent } from './company-bank-details-form.component';

describe('CompanyBankDetailsFormComponent', () => {
  let component: CompanyBankDetailsFormComponent;
  let fixture: ComponentFixture<CompanyBankDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CompanyBankDetailsFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBankDetailsFormComponent);
    component = fixture.componentInstance;
    component.bankDetails = {} as CompanyBankDetails;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitForm()', () => {
    it('should emit formSubmitted event', () => {
      spyOn(component.formSubmitted, 'emit');

      const payload: CompanyBankDetails = {
        id: null,
        name: null,
        accountNumber: null,
        bin: null,
        swift: null
      };

      component.submitForm();
      expect(component.formSubmitted.emit).toHaveBeenCalledWith(payload);
    });
  });
});
