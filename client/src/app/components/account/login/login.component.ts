import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user.model';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent {
  userLogIn: AppUser | undefined;
  showError: AppUser | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private accountService: AccountService) {
  }

  //#region Create Form Group/controler (AbstractControl)
  userFg = this.fb.group({ // formGroup
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
  });
  //#endregion

  //#region Forms Properties
  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }
  //#endregion

  logInUser(): void {
    this.accountService.logIn(this.EmailCtrl.value, this.PasswordCtrl.value).subscribe({
      next: response => {
        this.router.navigateByUrl('/user-profile');
        console.log(response);
        if (response) {
          sessionStorage.setItem('user-id', response.id!); //for edit & show results & suggestion & createquestion & compare
        }
      },
      error: err => {
        this.showError = err.error;
        alert(this.showError);
        this.router.navigateByUrl('/sign-up');
      }
    });

    // this.http.get<AppUser>('http://localhost:5000/api/user/get-by-email-password/' + this.EmailCtrl.value + '/' + this.PasswordCtrl.value).subscribe(
    //   {
    //     next: Response => {
    //       this.userLogIn = Response
    //       if (this.userLogIn) {
    //         this.router.navigateByUrl('/user-profile');
    //         sessionStorage.setItem('user-id', this.userLogIn.id!);
    //         sessionStorage.setItem('invalid-login', "false");
    //       }
    //     },
    //     error: err => {
    //       this.showError = err.error;
    //       alert(this.showError);
    //       this.router.navigateByUrl('/sign-up');
    //     }
    //   }
    // );
  }
}