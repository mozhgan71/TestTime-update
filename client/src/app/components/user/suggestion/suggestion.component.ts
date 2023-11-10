import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Suggestion } from 'src/app/models/suggestion.model';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {
  suggestionRes: Suggestion | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

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

    this.http.post<Suggestion>('https://localhost:5001/api/suggestion/add-suggestion', seggestion).subscribe(
      {
        next: res => {
          this.suggestionRes = res;
          console.log(res);
        }
      }
    );
    this.suggestionFg.reset();
    // alert("نظر شما با موفقیت ثبت شد.");
  }
  //#endregion
}