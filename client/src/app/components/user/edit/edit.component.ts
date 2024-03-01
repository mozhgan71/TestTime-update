import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppUserUpdate } from '../../../models/app-user-register.model';
import { AppUser } from '../../../models/app-user.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule,
    ReactiveFormsModule, RouterModule]
})
export class EditComponent implements OnInit{  
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private memberService = inject(MemberService);

  userRes: AppUser | null | undefined;
  showError: AppUser | undefined;

  minDate = new Date(); // yyyy/mm/dd/hh/mm/ss
  maxDate = new Date();

  constructor() {
    this.showInfo();
  }

  ngOnInit(): void {
    // set datePicker year limitations
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 99, 0, 1); // not older than 99 years
    this.maxDate = new Date(currentYear - 9, 0, 1); // not earlier than 9 years
  }

  showInfo(): void {
    var userId = sessionStorage.getItem('user-id');

    this.memberService.getMemberById(userId).subscribe(
      {
        next: res => {
          this.userRes = res;
          if (this.userRes) {
            this.NameCtrl.setValue(this.userRes.name);
            this.FamilyCtrl.setValue(this.userRes.family);
            this.EmailCtrl.setValue(this.userRes.email);
            // this.PasswordCtrl.setValue(this.userRes.password);
            // this.ConfirmPasswordCtrl.setValue(this.userRes.confirmPassword);
            // this.AgeCtrl.setValue(this.userRes.age);
            this.EducationCtrl.setValue(this.userRes.education);
          }
        },
      }
    );
    // this.http.get<AppUser>('http://localhost:5000/api/user/get-by-id/' + userId).subscribe(
    //   {
    //     next: res => {
    //       this.userRes = res;
    //       console.log(res);
    //       this.NameCtrl.setValue(this.userRes.name);
    //       this.FamilyCtrl.setValue(this.userRes.family);
    //       this.EmailCtrl.setValue(this.userRes.email);
    //       // this.PasswordCtrl.setValue(this.userRes.password);
    //       // this.ConfirmPasswordCtrl.setValue(this.userRes.confirmPassword);
    //       this.AgeCtrl.setValue(this.userRes.age);
    //       this.EducationCtrl.setValue(this.userRes.education);
    //     },
    //   }
    // );
  }

  //#region Create Form Group/controler (AbstractControl)
  userFg = this.fb.group({ // formGroup
    nameCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    familyCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    // passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    // confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(8)]],
    ageCtrl: ['', [Validators.min(9), Validators.max(99)]],
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
    // const dobUpdated: string | undefined = this.getDateOnly(this.AgeCtrl.value);

    var userId = sessionStorage.getItem('user-id');

    console.log(this.userFg.value);

    // if (this.PasswordCtrl.value == this.ConfirmPasswordCtrl.value) {

    let user: AppUserUpdate = {
      name: this.NameCtrl.value,
      family: this.FamilyCtrl.value,
      email: this.EmailCtrl.value,
      // password: this.PasswordCtrl.value,
      // confirmPassword: this.ConfirmPasswordCtrl.value,
      age: this.getDateOnly(this.AgeCtrl.value),
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

  private getDateOnly(dob: string | null): string | undefined {
    if (!dob) return undefined;

    let theDob: Date = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10);
  }
}