import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { BankDetailsFormComponent } from './bank-details-form.component';

describe('BankDetailsFormComponent', () => {
  let component: BankDetailsFormComponent;
  let fixture: ComponentFixture<BankDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BankDetailsFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDetailsFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      name: new FormControl(null),
      accountNumber: new FormControl(null),
      bin: new FormControl(null),
      swift: new FormControl(null)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
