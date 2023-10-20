import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Admin } from 'src/app/models/admin-login.model';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLogInComponent {
  mainAdmin: Admin | undefined;
  showError: Admin | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
  }

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

    this.http.post<Admin>('https://localhost:5001/api/admin/login', admin).subscribe(
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