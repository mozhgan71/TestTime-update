import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private spinnerService = inject(NgxSpinnerService);

  loading() {
    this.spinnerService.show(undefined, {
      type: 'line-spin-fade',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      size: 'large'
    });
  }

  idle() {
    this.spinnerService.hide();
  }
}
