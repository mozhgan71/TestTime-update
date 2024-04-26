import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Suggestion } from '../../../models/suggestion.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { AutoFocusDirective } from '../../../directives/auto-focus.directive';
import { CustomErrorStateMatcher } from '../../../error-state-matcher';

@Component({
  standalone: true,
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule, RouterModule, AutoFocusDirective]
})
export class SuggestionComponent {
  private readonly baseApiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  suggestionRes: Suggestion | undefined;

  customErrorStateMatcher = new CustomErrorStateMatcher();

  //#region Create Form Group/controler (AbstractControl)
  suggestionFg = this.fb.group({ // formGroup
    fullNameCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    textCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
  });
  //#endregion

  //#region Forms Properties
  get FullNameCtrl(): FormControl {
    return this.suggestionFg.get('fullNameCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.suggestionFg.get('emailCtrl') as FormControl;
  }
  get TextCtrl(): FormControl {
    return this.suggestionFg.get('textCtrl') as FormControl;
  }
  //#endregion

  //#region Methods
  addSuggestion(): void {
    var userId = sessionStorage.getItem('user-id');

    console.log(this.suggestionFg.value);

    let seggestion: Suggestion = {
      userId: userId!,
      fullName: this.FullNameCtrl.value,
      email: this.EmailCtrl.value,
      date: new Date().toString(),
      text: this.TextCtrl.value
    }

    this.http.post<Suggestion>(this.baseApiUrl + 'suggestion/add-suggestion', seggestion).subscribe(
      {
        next: res => {
          this.suggestionRes = res;
          console.log(res);
        }
      }
    );
    this.suggestionFg.reset();
    alert("نظر شما با موفقیت ثبت شد.");
  }
  //#endregion
}