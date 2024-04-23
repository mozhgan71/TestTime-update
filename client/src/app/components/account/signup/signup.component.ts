import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppUserRegister } from '../../../models/app-user-register.model';
import { AppUser } from '../../../models/app-user.model';
import { AccountService } from '../../../services/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoggedInUser } from '../../../models/logged-in-user.model';
import { AutoFocusDirective } from '../../../directives/auto-focus.directive';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [RouterModule,MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCheckboxModule, ReactiveFormsModule,
    MatDatepickerModule, MatNativeDateModule,MatSnackBarModule,
    AutoFocusDirective]
})
export class SignUpComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private accountService = inject(AccountService);

  userRes: LoggedInUser | null | undefined;
  showError: AppUser | undefined;
  subscribedSignupUser: Subscription | undefined;

  myText: string | null | undefined;

  minDate = new Date(); // yyyy/mm/dd/hh/mm/ss
  maxDate = new Date();

  ngOnInit(): void {
    // set datePicker year limitations
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 99, 0, 1); // not older than 99 years
    this.maxDate = new Date(currentYear - 9, 0, 1); // not earlier than 9 years
  }

  ngOnDestroy(): void {
    this.subscribedSignupUser?.unsubscribe();    //zamani ke bekhaym error haro begirim az api az in ravesh mirim

    console.log('Unsubscribe Done');
  }

  //#region Create Form Group/controler (AbstractControl)
  userFg = this.fb.group({ // formGroup
    nameCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    familyCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    dateOfBirthCtrl: ['', [Validators.required]],
    educationCtrl: [''],
    rulesCtrl: ['', [Validators.required]]
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
  get DateOfBirthCtrl(): FormControl {
    return this.userFg.get('dateOfBirthCtrl') as FormControl;
  }
  get EducationCtrl(): FormControl {
    return this.userFg.get('educationCtrl') as FormControl;
  }
  get RulesCtrl(): FormControl {
    return this.userFg.get('rulesCtrl') as FormControl;
  }
  //#endregion

  //#region Methods
  registerUser(): void {
    const dob: string | undefined = this.getDateOnly(this.DateOfBirthCtrl.value);
    console.log(this.userFg.value);

    if (this.PasswordCtrl.value == this.ConfirmPasswordCtrl.value) {

      let user: AppUserRegister = {
        name: this.NameCtrl.value,
        family: this.FamilyCtrl.value,
        email: this.EmailCtrl.value,
        password: this.PasswordCtrl.value,
        confirmPassword: this.ConfirmPasswordCtrl.value,
        dateOfBirth: dob,
        education: this.EducationCtrl.value,
        rules: this.RulesCtrl.value,
      }

      this.subscribedSignupUser = this.accountService.registerUser(user).subscribe(
        {
          next: res => {
            this.userRes = res;
            this.myText = " .عزیز به گروه کاربران ما خوش آمدید" + this.userRes!.name;
            if (res) {
              sessionStorage.setItem('user-id', res.id!); //for edit & show results & suggestion & createquestion & compare
              this.userFg.reset();
            }
          },
          error: err => {
            this.showError = err.error;
            // alert(this.showError);
          }
        }
      );
    }
    else {
      alert("تکرار رمز عبور مشابه رمز عبور نمی باشد.");
    }
  }
  //#endregion

  /**
 * convert Angular Date to C# DateOnly
 * @param dob // yyyy/mm/dd/hh/mm/ss. Takes DateOfBirth
 * @returns yyyy/mm/dd
 */
  private getDateOnly(dob: string | null): string | undefined {
    if (!dob) return undefined;

    let theDob: Date = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10);
  }
}