import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyAddress } from '../../models';
import { CompanyAddressFormComponent } from './company-address-form.component';

describe('CompanyAddressFormComponent', () => {
  let component: CompanyAddressFormComponent;
  let fixture: ComponentFixture<CompanyAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CompanyAddressFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAddressFormComponent);
    component = fixture.componentInstance;
    component.address = {} as CompanyAddress;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitForm()', () => {
    it('should emit formSubmitted event', () => {
      spyOn(component.formSubmitted, 'emit');

      const payload: CompanyAddress = {
        id: null,
        country: null,
        city: null,
        street: null,
        house: null
      };

      component.submitForm();
      expect(component.formSubmitted.emit).toHaveBeenCalledWith(payload);
    });
  });
});
