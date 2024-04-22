import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Question } from '../../../models/question.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../environments/environment.development';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
  imports: [RouterModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, ReactiveFormsModule]
})
export class EditQuestionComponent {
  private readonly baseApiUrl = environment.apiUrl;

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  questionRes: Question | undefined;
  showError: Question | undefined;

  constructor() {
    this.showQuestion();
  }

  showQuestion(): void {
    var id = sessionStorage.getItem('id-question');

    this.http.get<Question>(this.baseApiUrl + 'question/get-by-id/' + id).subscribe(
      {
        next: res => {
          this.questionRes = res;
          console.log(res);
          this.FeildNameCtrl.setValue(this.questionRes.feildName);
          this.NumberCtrl.setValue(this.questionRes.numberQuestion);
          this.DescriptionCtrl.setValue(this.questionRes.descriptionQuestion);
          this.Option1Ctrl.setValue(this.questionRes.option1);
          this.Option2Ctrl.setValue(this.questionRes.option2);
          this.Option3Ctrl.setValue(this.questionRes.option3);
          this.Option4Ctrl.setValue(this.questionRes.option4);
          this.CorrectCtrl.setValue(this.questionRes.correctAnswer);
        },
      }
    );
  }

  //#region Create Form Group/controler (AbstractControl)
  questionFg = this.fb.group({ // formGroup
    feildNameCtrl: ['', [Validators.required]],
    numberCtrl: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    descriptionCtrl: ['', [Validators.required]],
    option1Ctrl: ['', [Validators.required]],
    option2Ctrl: ['', [Validators.required]],
    option3Ctrl: ['', [Validators.required]],
    option4Ctrl: ['', [Validators.required]],
    correctCtrl: ['', [Validators.required, Validators.maxLength(1), Validators.min(1), Validators.max(4)]],
  });
  //#endregion

  //#region Forms Properties
  get FeildNameCtrl(): FormControl {
    return this.questionFg.get('feildNameCtrl') as FormControl;
  }
  get NumberCtrl(): FormControl {
    return this.questionFg.get('numberCtrl') as FormControl;
  }
  get DescriptionCtrl(): FormControl {
    return this.questionFg.get('descriptionCtrl') as FormControl;
  }
  get Option1Ctrl(): FormControl {
    return this.questionFg.get('option1Ctrl') as FormControl;
  }
  get Option2Ctrl(): FormControl {
    return this.questionFg.get('option2Ctrl') as FormControl;
  }
  get Option3Ctrl(): FormControl {
    return this.questionFg.get('option3Ctrl') as FormControl;
  }
  get Option4Ctrl(): FormControl {
    return this.questionFg.get('option4Ctrl') as FormControl;
  }
  get CorrectCtrl(): FormControl {
    return this.questionFg.get('correctCtrl') as FormControl;
  }
  //#endregion

  //#region Methods
  editQuestion(): void {
    var id = sessionStorage.getItem('id-question');

    console.log(this.questionFg.value);

    let putQuestion: Question = {
      feildName: this.FeildNameCtrl.value,
      numberQuestion: this.NumberCtrl.value,
      descriptionQuestion: this.DescriptionCtrl.value,
      option1: this.Option1Ctrl.value,
      option2: this.Option2Ctrl.value,
      option3: this.Option3Ctrl.value,
      option4: this.Option4Ctrl.value,
      correctAnswer: this.CorrectCtrl.value
    }

    this.http.put<Question>(this.baseApiUrl + 'question/update/' + id!, putQuestion).subscribe(
      {
        next: res => {
          this.questionRes = res;
          console.log(res);
        },
      }
    );
    this.questionFg.reset();
  }
  //#endregion
}