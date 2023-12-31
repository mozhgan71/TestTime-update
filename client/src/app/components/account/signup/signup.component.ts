import { Component, inject } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule]
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private accountService = inject(AccountService);

  userRes: AppUser | null | undefined;
  showError: AppUser | undefined;
  subscription: Subscription | undefined;

  myText: string | null | undefined;

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
    ageCtrl: ['', [Validators.required]],
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