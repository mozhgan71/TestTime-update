import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Admin } from '../../../models/admin-login.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../environments/environment.development';
import { AutoFocusDirective } from '../../../directives/auto-focus.directive';

@Component({
  standalone: true,
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule, AutoFocusDirective]
})
export class AdminLogInComponent {
  private readonly baseApiUrl = environment.apiUrl;

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  mainAdmin: Admin | undefined;
  showError: Admin | undefined;

  //#region Create Form Group/controler (AbstractControl)
  adminFg = this.fb.group({ // formGroup
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
  });
  //#endregion

  //#region Forms Properties
  get EmailCtrl(): FormControl {
    return this.adminFg.get('emailCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.adminFg.get('passwordCtrl') as FormControl;
  }
  //#endregion

  logIn(): void {
    let admin: Admin = {
      email: this.EmailCtrl.value,
      password: this.PasswordCtrl.value,
    }

    this.http.post<Admin>(this.baseApiUrl + 'admin/login', admin).subscribe(
      {
        next: res => {
          this.mainAdmin = res
          console.log(res);
          if (this.mainAdmin) {
            this.router.navigateByUrl('/admin-profile');

            sessionStorage.setItem('logedin', "true");
          }
        },
        error: err => {
          this.showError = err.error;
        }
      });
  }
}