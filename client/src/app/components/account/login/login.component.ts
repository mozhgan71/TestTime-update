import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from '../../../models/app-user.model';
import { AccountService } from '../../../services/account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AutoFocusDirective } from '../../../directives/auto-focus.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserProfileComponent } from '../../user/userprofile/userprofile.component';
import { LoggedInUser } from '../../../models/logged-in-user.model';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, ReactiveFormsModule, MatSnackBarModule,
    AutoFocusDirective, UserProfileComponent]
})
export class LogInComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private accountService = inject(AccountService);

  userLogIn: LoggedInUser | null | undefined;
  showError: AppUser | undefined;
  subscription: Subscription | undefined;

  //#region Create Form Group/controler (AbstractControl)
  userFg = this.fb.group({ // formGroup
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
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

  ngOnDestroy(): void {                       //zamani ke bekhaym error haro begirim az api az in ravesh mirim
    this.subscription?.unsubscribe();

    console.log('Unsubscribe Done');
  }

  logInUser(): void {
    this.accountService.logIn(this.EmailCtrl.value, this.PasswordCtrl.value).subscribe({
      next: response => {
        // this.userLogIn = response;
        console.log(response);
        if (response) {
          sessionStorage.setItem('user-id', response.id!); //for edit & show results & suggestion & createquestion & compare
        }
      },
      error: err => {
        this.showError = err.error;
        // alert(this.showError);
        // this.router.navigateByUrl('/sign-up');
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

  getState(): void {
    console.log(this.PasswordCtrl);
  }
}