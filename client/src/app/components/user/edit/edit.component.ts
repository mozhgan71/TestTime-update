import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppUser } from '../../../models/app-user.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from '../../../services/user.service';
import { UserUpdate } from '../../../models/user-update.model';
import { take } from 'rxjs';
import { ApiResponse } from '../../../models/helpers/apiResponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule,
    ReactiveFormsModule, RouterModule]
})
export class EditComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private memberService = inject(MemberService);
  private userService = inject(UserService);
  private matSnak = inject(MatSnackBar);

  userRes: AppUser | null | undefined;
  showError: AppUser | undefined;

  minDate = new Date(); // yyyy/mm/dd/hh/mm/ss
  maxDate = new Date();

  constructor() {
    // this.showInfo();
  }

  ngOnInit(): void {
    this.showInfo();
  }

  showInfo(): void {
    var userId = sessionStorage.getItem('user-id');

    this.memberService.getMemberById(userId).subscribe(
      {
        next: res => {
          this.userRes = res;
          console.log(this.userRes);
          if (this.userRes) {
            this.NameCtrl.setValue(this.userRes.name);
            this.FamilyCtrl.setValue(this.userRes.family);
            this.EmailCtrl.setValue(this.userRes.email);
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
  // get AgeCtrl(): FormControl {
  //   return this.userFg.get('ageCtrl') as FormControl;
  // }
  get EducationCtrl(): FormControl {
    return this.userFg.get('educationCtrl') as FormControl;
  }
  //#endregion

  //#region Methods
  editUser(): void {
    var userId = sessionStorage.getItem('user-id');

    console.log(this.userFg.value);

    // if (this.PasswordCtrl.value == this.ConfirmPasswordCtrl.value) {

    let updatedUser: UserUpdate = {
      name: this.NameCtrl.value,
      family: this.FamilyCtrl.value,
      email: this.EmailCtrl.value,
      // age: this.AgeCtrl.value,
      education: this.EducationCtrl.value,
    }

    this.userService.updateUser(updatedUser)
      .pipe(take(1))
      .subscribe({
        next: (response: ApiResponse) => {
          if (response.message) {
            this.matSnak.open(response.message, "Close", { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 6000 });
          }
        }
      });
  }
  //   else {
  //     alert("تغییرات اعمال نشد؛ تکرار رمز عبور مشابه رمز عبور نمی باشد.");

  // }
  //#endregion
}