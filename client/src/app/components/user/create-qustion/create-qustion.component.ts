import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Question } from '../../../models/question.model';
import { QuestionDto } from '../../../models/questionDto.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { CustomErrorStateMatcher } from '../../../error-state-matcher';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-create-qustion',
  templateUrl: './create-qustion.component.html',
  styleUrls: ['./create-qustion.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, RouterModule]
})
export class CreateQustionComponent {
  private readonly baseApiUrl = environment.apiUrl;

  customErrorStateMatcher = new CustomErrorStateMatcher();

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  questionRes: Question | undefined;

  //#region Create Form Group/controler (AbstractControl)
  questionFg = this.fb.group({ // formGroup
    feildNameCtrl: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    descriptionCtrl: ['', [Validators.required, Validators.minLength(5)]],
    option1Ctrl: ['', [Validators.required]],
    option2Ctrl: ['', [Validators.required]],
    option3Ctrl: ['', [Validators.required]],
    option4Ctrl: ['', [Validators.required]],
    correctCtrl: ['', [Validators.required, Validators.maxLength(1), Validators.min(1), Validators.max(4)]]
  });
  //#endregion

  //#region Forms Properties
  get FeildNameCtrl(): FormControl {
    return this.questionFg.get('feildNameCtrl') as FormControl;
  }
  get DscriptionCtrl(): FormControl {
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
  addQuestion(): void {
    console.log(this.questionFg.value);

    let question: QuestionDto = {
      feildName: this.FeildNameCtrl.value,
      descriptionQuestion: this.DscriptionCtrl.value,
      option1: this.Option1Ctrl.value,
      option2: this.Option2Ctrl.value,
      option3: this.Option3Ctrl.value,
      option4: this.Option4Ctrl.value,
      correctAnswer: this.CorrectCtrl.value
    }

    this.http.post<Question>(this.baseApiUrl + 'userquestion/add-question', question).subscribe(
      {
        next: res => {
          this.questionRes = res;
          console.log(res);
        }
      }
    );
    this.snackBar.open(".ممنون از همکاری شما.\n سوال شما با موفقیت ثبت شد", "Close", { horizontalPosition: 'center', verticalPosition: 'top', duration: 4000 });

    this.questionFg.reset();
  }
  //#endregion
}