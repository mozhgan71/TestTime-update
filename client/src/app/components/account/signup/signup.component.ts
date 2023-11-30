import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppUser } from 'src/app/models/app-user.model'
import { AppUserRegister } from 'src/app/models/app-user-register.model';
import { AccountService } from 'src/app/services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  userRes: AppUser | null | undefined;
  showError: AppUser | undefined;
  subscription: Subscription | undefined;

  myText: string | null | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private accountService: AccountService) {
  }

  ngOnDestroy(): void {                       //zamani ke bekhaym error haro begirim az api az in ravesh mirim
    this.subscription?.unsubscribe();

    console.log('Unsubscribe Done');
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
    rulesCtrl: ['', Validators.required]
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
  get RulesCtrl(): FormControl {
    return this.userFg.get('rulesCtrl') as FormControl;
  }
  //#endregion

  //#region Methods
  registerUser(): void {
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
        rules: this.RulesCtrl.value,
      }

      this.accountService.registerUser(user).subscribe(
        {
          next: res => {
            this.userRes = res;
            this.myText = " .عزیز به گروه کاربران ما خوش آمدید" + this.userRes!.name;
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
      alert("تکرار رمز عبور مشابه رمز عبور نمی باشد.");
    }
  }
  //#endregion
}