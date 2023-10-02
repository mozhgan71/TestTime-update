import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppUserRegister } from 'src/app/models/app-user-register.model';
import { AppUser } from 'src/app/models/app-user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  userRes: AppUser | undefined;
  showError: AppUser | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.showInfo();
  }

  showInfo(): void {
    var userId = sessionStorage.getItem('user-id');

    this.http.get<AppUser>('http://localhost:5000/api/user/get-by-user-id/' + userId).subscribe(
      {
        next: res => {
          this.userRes = res;
          console.log(res);
          this.NameCtrl.setValue(this.userRes.name);
          this.FamilyCtrl.setValue(this.userRes.family);
          this.EmailCtrl.setValue(this.userRes.email);
          this.PasswordCtrl.setValue(this.userRes.password);
          this.ConfirmPasswordCtrl.setValue(this.userRes.confirmPassword);
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
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(8)]],
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
  get PasswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }
  get ConfirmPasswordCtrl(): FormControl {
    return this.userFg.get('confirmPasswordCtrl') as FormControl;
  }
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

    if (this.PasswordCtrl.value == this.ConfirmPasswordCtrl.value) {

      let user: AppUserRegister = {
        name: this.NameCtrl.value,
        family: this.FamilyCtrl.value,
        email: this.EmailCtrl.value,
        password: this.PasswordCtrl.value,
        confirmPassword: this.ConfirmPasswordCtrl.value,
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
    else {
      alert("تغییرات اعمال نشد؛ تکرار رمز عبور مشابه رمز عبور نمی باشد.");
    }
  }
  //#endregion
}