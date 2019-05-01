import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';

import { BehaviorSubject, Observable } from 'rxjs';

import { CompanyAddress, CompanyBankDetails } from '../../models';
import { SettingsService } from '../../services/settings.service';

const SUCCESS_MESSAGE = 'Settings saved!';

@Component({
  selector: 'da-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  address: CompanyAddress;
  bankDetails: CompanyBankDetails;

  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<ValidationError | null>(null);

  constructor(
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private feedbackService: FeedbackService
  ) {}

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  get error$(): Observable<ValidationError | null> {
    return this.error.asObservable();
  }

  ngOnInit() {
    const [address, bankDetails] = this.route.snapshot.data.settings;
    this.address = address;
    this.bankDetails = bankDetails;
  }

  saveAddress(address: CompanyAddress) {
    const { id } = address;

    this.loading.next(true);
    this.settingsService[id ? 'updateAddress' : 'createAddress'](
      address
    ).subscribe(
      () => {
        this.loading.next(false);
        this.feedbackService.success(SUCCESS_MESSAGE);
      },
      err => {
        this.loading.next(false);
        this.error.next(err);
      }
    );
  }

  saveBankDetails(bankDetails: CompanyBankDetails) {
    const { id } = bankDetails;

    this.loading.next(true);
    this.settingsService[id ? 'updateBankDetails' : 'createBankDetails'](
      bankDetails
    ).subscribe(
      () => {
        this.loading.next(false);
        this.feedbackService.success(SUCCESS_MESSAGE);
      },
      err => {
        this.loading.next(false);
        this.error.next(err);
      }
    );
  }
}
