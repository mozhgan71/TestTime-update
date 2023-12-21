import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppUserUpdate } from '../../../models/app-user-register.model';
import { AppUser } from '../../../models/app-user.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule, RouterModule]
})
export class EditComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  userRes: AppUser | undefined;
  showError: AppUser | undefined;

  constructor() {
    this.showInfo();
  }

  showInfo(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<AppUser>('http://localhost:5000/api/user/get-by-id/' + userId).subscribe(
      {
        next: res => {
          this.userRes = res;
          console.log(res);
          this.NameCtrl.setValue(this.userRes.name);
          this.FamilyCtrl.setValue(this.userRes.family);
          this.EmailCtrl.setValue(this.userRes.email);
          // this.PasswordCtrl.setValue(this.userRes.password);
          // this.ConfirmPasswordCtrl.setValue(this.userRes.confirmPassword);
          this.AgeCtrl.setValue(this.userRes.age);
          this.EducationCtrl.setValue(this.userRes.education);
        },
      }
    );
  }

  //#region Create Form Group/controler (AbstractControl)
  userFg = this.fb.group({ // formGroup
    nameCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    familyCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    // passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    // confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    ageCtrl: ['', [Validators.required, Validators.min(9), Validators.max(99)]],
    educationCtrl: [''],
  });
  //#endregion

  //#region Forms Properties
  get NameCtrl(): FormControl {
    return this.userFg.get('nameCtrl') as FormControl;
  }
  get FamilyCtrl(): FormControl {
    return this.userFg.get('familyCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  // get PasswordCtrl(): FormControl {
  //   return this.userFg.get('passwordCtrl') as FormControl;
  // }
  // get ConfirmPasswordCtrl(): FormControl {
  //   return this.userFg.get('confirmPasswordCtrl') as FormControl;
  // }
  get AgeCtrl(): FormControl {
    return this.userFg.get('ageCtrl') as FormControl;
  }
  get EducationCtrl(): FormControl {
    return this.userFg.get('educationCtrl') as FormControl;
  }
  //#endregion

  //#region Methods
  editUser(): void {
    var userId = sessionStorage.getItem('user-id');

    console.log(this.userFg.value);

    // if (this.PasswordCtrl.value == this.ConfirmPasswordCtrl.value) {

    let user: AppUserUpdate = {
      name: this.NameCtrl.value,
      family: this.FamilyCtrl.value,
      email: this.EmailCtrl.value,
      // password: this.PasswordCtrl.value,
      // confirmPassword: this.ConfirmPasswordCtrl.value,
      age: this.AgeCtrl.value,
      education: this.EducationCtrl.value,
    }

    this.http.put<AppUser>('http://localhost:5000/api/user/update/' + userId, user).subscribe(
      {
        next: res => {
          this.userRes = res;
          alert("تغییرات با موفقیت اعمال شد.");
        },
        error: err => {
          this.showError = err.error;
          alert(this.showError);
        }
      }
    );
    this.userFg.reset();
  }
  //   else {
  //     alert("تغییرات اعمال نشد؛ تکرار رمز عبور مشابه رمز عبور نمی باشد.");

  // }
  //#endregion
}